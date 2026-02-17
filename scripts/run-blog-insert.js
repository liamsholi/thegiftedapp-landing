const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://xvbendwssoteawvrbglr.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set.');
  console.log('\nTo run this script, you need to set the service role key:');
  console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/xvbendwssoteawvrbglr/settings/api');
  console.log('2. Copy the "service_role" key (NOT the anon key)');
  console.log('3. Run: SUPABASE_SERVICE_ROLE_KEY=your_key_here node scripts/run-blog-insert.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false }
});

// Read the SQL file
const sqlPath = path.join(__dirname, 'insert-blog-posts.sql');
const sqlContent = fs.readFileSync(sqlPath, 'utf-8');

// Split into individual statements (split by semicolon followed by newlines and comments)
const statements = sqlContent
  .split(/;\s*\n\s*--/)
  .map((s, i) => i === 0 ? s : '--' + s)
  .filter(s => s.trim().length > 0);

async function runInserts() {
  console.log(`Found ${statements.length} SQL statements to execute.\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i].trim();
    if (!statement) continue;
    
    // Extract the post title from the statement for logging
    const titleMatch = statement.match(/VALUES\s*\(\s*'([^']+)'/);
    const title = titleMatch ? titleMatch[1] : `Statement ${i + 1}`;
    
    try {
      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' });
      
      if (error) {
        // If RPC doesn't exist, try direct query
        const { error: directError } = await supabase.from('blog_posts').select('id').limit(0);
        
        // Execute via REST API workaround - use raw fetch
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceRoleKey,
            'Authorization': `Bearer ${supabaseServiceRoleKey}`
          },
          body: JSON.stringify({ query: statement + ';' })
        });
        
        if (!response.ok) {
          throw new Error(error.message || 'Unknown error');
        }
      }
      
      console.log(`✓ Inserted: ${title}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Failed: ${title}`);
      console.error(`  Error: ${err.message}\n`);
      errorCount++;
    }
  }
  
  console.log(`\n========================================`);
  console.log(`Completed: ${successCount} successful, ${errorCount} failed`);
}

// Alternative approach - execute SQL directly via Supabase SQL endpoint
async function runInsertsDirectly() {
  console.log('Executing blog post inserts...\n');
  
  try {
    // Execute the entire SQL file as one query
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceRoleKey,
        'Authorization': `Bearer ${supabaseServiceRoleKey}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({ query: sqlContent })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }
    
    console.log('✓ All blog posts inserted successfully!');
  } catch (err) {
    console.log('Direct execution failed, trying individual statements...\n');
    
    // Fall back to individual INSERT statements parsed from the file
    const insertStatements = sqlContent.match(/INSERT INTO blog_posts[\s\S]*?ON CONFLICT[\s\S]*?;/g);
    
    if (!insertStatements) {
      console.error('Could not parse INSERT statements from SQL file');
      return;
    }
    
    console.log(`Found ${insertStatements.length} blog posts to insert.\n`);
    
    let successCount = 0;
    
    for (const statement of insertStatements) {
      const titleMatch = statement.match(/VALUES\s*\(\s*E?'([^']+)'/);
      const title = titleMatch ? titleMatch[1].substring(0, 50) : 'Unknown';
      
      try {
        const { data, error } = await supabase.rpc('exec_sql', { 
          sql_query: statement 
        });
        
        if (error) throw error;
        
        console.log(`✓ ${title}...`);
        successCount++;
      } catch (e) {
        // Try alternative method
        try {
          // Parse the values and insert via Supabase client
          const slugMatch = statement.match(/'([a-z0-9-]+)',\s*--.*slug|'([a-z0-9-]+)',\s*E?'/);
          console.log(`  Attempting: ${title}...`);
        } catch (e2) {
          console.error(`✗ Failed: ${title}`);
        }
      }
    }
    
    console.log(`\nCompleted ${successCount} inserts.`);
  }
}

// Main execution
console.log('========================================');
console.log('Blog Post Bulk Insert Script');
console.log('========================================\n');

runInsertsDirectly().catch(console.error);

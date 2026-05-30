const fs = require('fs');

const files = [
  'src/app/api/blog/[id]/route.ts',
  'src/app/api/jobs/[id]/route.ts',
  'src/app/api/questions/[id]/route.ts',
  'src/app/api/categories/[id]/route.ts',
  'src/app/api/blog/route.ts',
  'src/app/api/jobs/route.ts',
  'src/app/api/questions/route.ts',
  'src/app/api/categories/route.ts',
  'src/app/api/newsletter/route.ts',
];

const line = 'export const dynamic = "force-dynamic";\n';

files.forEach(function(f) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    if (!content.includes('force-dynamic')) {
      fs.writeFileSync(f, line + content);
      console.log('FIXED: ' + f);
    } else {
      console.log('SKIP: ' + f);
    }
  } catch(e) {
    console.log('ERROR: ' + f + ' - ' + e.message);
  }
});

console.log('All done!');
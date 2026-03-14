const { exec } = require('child_process');
console.log('Starting Vite Preview on all network interfaces...');
const child = exec('npm run preview -- --host 0.0.0.0');
child.stdout.on('data', (data) => console.log(data));
child.stderr.on('data', (data) => console.error(data));

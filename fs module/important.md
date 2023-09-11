// const content = 'Hello, world!';
// fs.writeFile('example.txt', content, 'utf8', (err) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('File has been written.');
// });
// // Create a directory
// fs.mkdir('myfolder', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Directory created.');
//   });

//   // List contents of a directory
//   fs.readdir('myfolder', (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Files in directory:', files);
//   });

//   // Remove a directory
//   fs.rmdir('myfolder', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('Directory removed.');
//   });

//   fs.readFile('example.txt', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(data);
//   });



// fs.stat('example.txt', (err, stats) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File size:', stats.size);
//     console.log('Is it a file?', stats.isFile());
//     console.log('Is it a directory?', stats.isDirectory());
//   });

// fs.rename('oldfile.txt', 'newfile.txt', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File renamed.');
//   });


// its delete file

// fs.unlink('example.txt', (err) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('File deleted.');
//   });


// const readStream = fs.createReadStream('example.txt');

// readStream.on('data', (chunk) => {
//     console.log('Read chunk:', chunk.length, 'bytes');
// });

// readStream.on('end', () => {
//     console.log('Read finished.');
// });
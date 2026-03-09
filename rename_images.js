const fs = require('fs');
const path = require('path');

const dir = 'd:/wedding/public/images';
const renames = [
    ['ảnh đầu tiên.jpg', 'anh-dau-tien.jpg'],
    ['ảnh cuối cảm ơn.jpg', 'anh-cuoi-cam-on.jpg'],
    ['ảnh nhà gái.jpg', 'anh-nha-gai.jpg'],
    ['ảnh nhà trai.jpg', 'anh-nha-trai.jpg']
];

renames.forEach(([oldName, newName]) => {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldName} -> ${newName}`);
    } else {
        console.log(`Not found: ${oldName}`);
    }
});

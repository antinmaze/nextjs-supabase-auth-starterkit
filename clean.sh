find . -type f -name .DS_Store -print0 | xargs -0 rm
rm -rf node_modules package-lock.json

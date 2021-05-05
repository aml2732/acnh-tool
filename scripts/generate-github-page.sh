#!/bin/bash
# Generate the deployment (docs) folder for use by github pages

npm run build
rm -rf docs
mv build docs
sed -i 's#/static/#./static/#g' docs/index.html

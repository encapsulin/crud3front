pwd
#cd Front/crud
cd react-m2m
npm run build
#sed -i 's/="\//=".\//g' ./build/index.html
aws s3 sync ./build/ s3://dev.encaps.click/

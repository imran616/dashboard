directory=$(dirname $(dirname $(readlink -f "$0")))
cd $directory/scripts

echo "Run: source .env"
source .env

echo "Run: npm run build:stage"
npm run build:stage
cd $directory/dist/lms-v2/browser

echo "Run: aws s3 --profile $AWS_PROFILE sync"
aws s3 --profile $AWS_PROFILE sync . s3://dev-lms-ui-2.0 --delete --exclude "*.js.map" --exclude "*.css.map"

echo "Run: aws cloudfront --profile $AWS_PROFILE create-invalidation"
aws cloudfront --profile $AWS_PROFILE create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

echo "-------------------------------"
echo "Success: Stage deployment done!"

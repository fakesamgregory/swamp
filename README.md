# swamp-website

This repo holds code associated with swampexperience.com. It's here because Webflow has a 10000 line limit and it's easier to edit the code outside of the Webflow environment.

## Getting Started

The JavaScript bundles into separate files intended to be run on specific pages. `global.js` runs on every page.

Bundle the code using

```
npm run dev
```

## Deployments

The code is automatically deployed when pushed to the main branch in Github.

It is sent to Amazon S3 and accessed through the CDN Cloudfront `https://d1sx5up8n3wciq.cloudfront.net`.

## Development

To see this code on your development environment, download (Proxyman)[https://proxyman.io/]. My setting up an interception on the Cloudfront URL and map it Locally to these local files, you should see your development work.

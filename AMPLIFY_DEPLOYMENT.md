# AWS Amplify Deployment Guide for PI Demo Dashboard

This document provides instructions for deploying the PI Demo Dashboard frontend application to AWS Amplify.

## Overview

The PI Demo Dashboard is a Vite + React + TypeScript application that can be deployed to AWS Amplify Hosting. The `amplify.yml` configuration file defines the build process and deployment settings.

## Prerequisites

- AWS Account with Amplify access
- GitHub/GitLab/Bitbucket repository connected to AWS Amplify
- Node.js 18.x or later (recommended)

## Build Configuration

The application uses the following build configuration:

- **Build Tool**: Vite
- **Package Manager**: npm
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node Version**: Latest LTS (automatically detected by Amplify)

## Amplify Configuration (`amplify.yml`)

The `amplify.yml` file includes:

### Build Phases

1. **preBuild**: Installs dependencies using `npm ci` for reproducible builds
2. **build**: Runs TypeScript compilation and Vite build

### Artifacts

- **baseDirectory**: `dist` - The output directory for built files
- **files**: All files in the dist directory are deployed

### Cache

- **node_modules**: Cached between builds to speed up deployments

### Security Headers

Custom security headers are automatically applied to all resources:

- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-XSS-Protection: 1; mode=block` - Enables XSS filtering
- `Referrer-Policy: strict-origin-when-cross-origin` - Controls referrer information

## Deployment Steps

### Option 1: Console Deployment

1. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Select your Git provider and authenticate
4. Choose the repository and branch to deploy
5. Amplify will automatically detect the `amplify.yml` file
6. Review the build settings and click "Save and deploy"

### Option 2: CLI Deployment

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in your project
cd pi-demo-dashboard
amplify init

# Add hosting
amplify add hosting

# Publish your app
amplify publish
```

## Environment Variables

If your application requires environment variables, add them in the Amplify Console:

1. Go to your app in the Amplify Console
2. Navigate to "Environment variables" in the left sidebar
3. Add your variables (e.g., API endpoints, feature flags)

Example variables you might need:

```
VITE_API_URL=https://api.example.com
VITE_APP_NAME=PI Demo Dashboard
```

**Note**: Vite requires environment variables to be prefixed with `VITE_` to be exposed to the browser.

## Advanced Configuration

### Custom Domain

To add a custom domain:

1. Go to "Domain management" in the Amplify Console
2. Click "Add domain"
3. Follow the DNS configuration steps
4. Amplify will automatically provision an SSL certificate

### Build Image Settings

If you need a specific Node.js version, update the build settings:

1. Go to "Build settings" in the Amplify Console
2. Click "Edit" on the build image
3. Select or specify the Node.js version

### Monorepo Support

If this is part of a monorepo, update the `amplify.yml`:

```yaml
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - cd pi-demo-dashboard
            - npm ci
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: pi-demo-dashboard/dist
        files:
          - '**/*'
      cache:
        paths:
          - pi-demo-dashboard/node_modules/**/*
    appRoot: pi-demo-dashboard
```

## Troubleshooting

### Build Fails with TypeScript Errors

Ensure all TypeScript errors are resolved locally before deploying:

```bash
npm run build
```

### Out of Memory During Build

Add memory configuration to the build phase:

```yaml
build:
  commands:
    - export NODE_OPTIONS="--max-old-space-size=4096"
    - npm run build
```

### Missing Dependencies

Clear the cache and rebuild:

1. Go to "Build settings" in the Amplify Console
2. Click "Clear cache"
3. Trigger a new build

## Performance Optimization

### Enable Compression

Amplify automatically enables Gzip compression for static assets.

### Cache Control Headers

Add cache control headers for static assets in `amplify.yml`:

```yaml
customHeaders:
  - pattern: '**/*.js'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '**/*.css'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
  - pattern: '**/*.{png,jpg,jpeg,gif,svg,ico}'
    headers:
      - key: 'Cache-Control'
        value: 'public, max-age=31536000, immutable'
```

## Monitoring

### Access Logs

View access logs in the Amplify Console under "Monitoring" → "Access logs"

### Build History

View build history and logs under "Build history" in the Amplify Console

## CI/CD Integration

Amplify automatically:

- Builds and deploys on every commit to the connected branch
- Provides preview environments for pull requests (if enabled)
- Rolls back to previous versions if a build fails

### Branch-based Deployments

You can set up multiple environments:

- **main/master**: Production environment
- **develop**: Staging environment
- **feature/***: Feature branch previews

## Cost Estimation

Amplify pricing includes:

- **Build time**: $0.01 per build minute
- **Hosting**: $0.15 per GB served
- **Data transfer**: First 15 GB/month free, then $0.15 per GB

For this dashboard application, typical monthly costs range from $5-20 depending on traffic.

## Security Best Practices

1. **Enable branch protection** in your Git provider
2. **Use environment variables** for sensitive configuration
3. **Enable CloudWatch monitoring** for production apps
4. **Set up custom domain with SSL** (automatically provided by Amplify)
5. **Review and test security headers** using tools like securityheaders.com

## Support

For issues or questions:

- [AWS Amplify Documentation](https://docs.amplify.aws/)
- [AWS Amplify Forum](https://github.com/aws-amplify/amplify-hosting/discussions)
- [Vite Documentation](https://vitejs.dev/)

## Additional Resources

- [Amplify Hosting Guide](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Custom Headers Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/custom-headers.html)
- [Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)


# Faisal Ansari — Cloud & Platform Architect Portfolio

> Enterprise portfolio website of Faisal Ansari (Deputy Manager Systems @ State Bank of India), showcasing multi-region OpenShift operations, AWS EKS Karpenter autoscaling, Tanzu GemFire caching, Apache Kafka lag remediation, and DevSecOps pipelines.

Live Site: [https://faisal.host](https://faisal.host)  
Engineering Blog: [https://blog.faisal.host](https://blog.faisal.host)  
Notion Architecture Notes: [https://notes.faisal.host](https://notes.faisal.host)  

---

## 🏗️ Architecture & Hosting

The portfolio is hosted on a highly available, enterprise-grade serverless architecture on AWS:

```
[ Route 53 (DNS / Anycast) ]
            │
            ▼
[ CloudFront CDN + ACM TLS 1.3 ] ──(Origin Access Control - OAC)──► [ Private S3 Bucket ]
            ▲
            │ (Automated GitOps CI/CD)
[ GitHub Actions Workflow (Push to main) ]
```

- **Private S3 Bucket**: All public access blocked; accessed exclusively via CloudFront Origin Access Control (OAC).
- **AWS CloudFront Distribution**: Global edge caching, HTTP to HTTPS redirection, TLS 1.3 encryption, and automated cache invalidation.
- **AWS Certificate Manager (ACM)**: SSL/TLS certificate in `us-east-1` attached to `faisal.host` and `www.faisal.host`.
- **Amazon Route 53**: Dual-stack IPv4 (A) and IPv6 (AAAA) Alias records pointing to CloudFront.
- **GitHub Actions CI/CD**: Automated pipeline triggering on every `git push` to `main`.

---

## 🌿 Git Branching & Deployment Strategy

This repository follows standard **GitHub Flow** with dedicated preview and production environments:

- **`main` (Production)**: Locked, production branch. Mirrors live production at [https://faisal.host](https://faisal.host). Deployed automatically via `deploy-prod.yml` on PR merge.
- **`dev` (Preview / Integration)**: Default active development branch. Deployed automatically via `deploy-preview.yml` to [https://preview.faisal.host](https://preview.faisal.host) for testing.
- **`feature/<name>` / `fix/<name>`**: Isolated feature branches created from `dev`. Merged back into `dev` after local verification.

> [!NOTE]
> **Preview SEO Protection**: The preview deployment pipeline automatically overwrites `robots.txt` (`Disallow: /`) and injects `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">` into `index.html`. This strictly prevents search engines like Google from indexing `preview.faisal.host`, ensuring only the canonical production domain `faisal.host` is indexed.

---

## 🚀 GitHub Actions CI/CD Setup

To enable automated zero-downtime deployments via GitHub Actions, configure the following secrets in your repository (**Settings** ➔ **Secrets and variables** ➔ **Actions**):

| Secret Name | Description | Environment |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | IAM User Access Key ID with S3 & CloudFront permissions | Global |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Access Key | Global |
| `AWS_REGION` | AWS Region of your S3 Buckets (e.g., `us-east-1` or `ap-south-1`) | Global |
| `S3_BUCKET_NAME` | Name of your private production S3 bucket | Production (`main`) |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your production CloudFront distribution identifier | Production (`main`) |
| `DEV_S3_BUCKET_NAME` | Name of your private preview S3 bucket | Preview (`dev`) |
| `DEV_CLOUDFRONT_DISTRIBUTION_ID` | Your preview CloudFront distribution identifier | Preview (`dev`) |

### Minimum IAM Permissions Required for GitHub Actions User

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "S3SyncPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::YOUR_S3_BUCKET_NAME",
        "arn:aws:s3:::YOUR_S3_BUCKET_NAME/*"
      ]
    },
    {
      "Sid": "CloudFrontInvalidation",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::YOUR_AWS_ACCOUNT_ID:distribution/YOUR_DISTRIBUTION_ID"
    }
  ]
}
```

---

## 💻 Local Development

Run locally via any static web server (e.g., Python):
```bash
python3 -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📄 License & Copyright

© 2026 Faisal Ansari. All rights reserved.

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

## 🌿 Git Branching Strategy

This repository follows standard **GitHub Flow** with dedicated development and production tiers:

- **`main` (Production)**: Locked, production branch. Mirrors live production at [https://faisal.host](https://faisal.host). Deployed automatically via AWS S3/CloudFront CI/CD on merge.
- **`dev` (Development & Integration)**: Default active development branch. All features, UI updates, and fixes are integrated and validated here.
- **`feature/<name>` / `fix/<name>`**: Isolated feature branches created from `dev`. Merged back into `dev` after local verification.

---

## 🚀 GitHub Actions CI/CD Setup

To enable automated zero-downtime deployments via GitHub Actions, configure the following secrets in your repository (**Settings** ➔ **Secrets and variables** ➔ **Actions**):

| Secret Name | Description | Required |
| :--- | :--- | :--- |
| `AWS_ACCESS_KEY_ID` | IAM User Access Key ID with S3 & CloudFront permissions | Yes |
| `AWS_SECRET_ACCESS_KEY` | IAM User Secret Access Key | Yes |
| `AWS_REGION` | AWS Region of your S3 Bucket (e.g., `us-east-1` or `ap-south-1`) | Yes |
| `S3_BUCKET_NAME` | Name of your private S3 bucket | Yes |
| `CLOUDFRONT_DISTRIBUTION_ID` | Your CloudFront distribution identifier | Yes |

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

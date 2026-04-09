---
description: Review Angular project architecture and suggest improvements
---
Review this Angular SSR project's architecture, dependencies, folder structure, and components. Analyze for:

1. **Architecture**
   - SSR configuration and rendering strategy
   - State management patterns (signals, services, stores)
   - Module/component organization
   - Dependency injection patterns
   - Error handling approach

2. **Dependencies**
   - Outdated or deprecated packages
   - Security vulnerabilities
   - Unused dependencies
   - Missing recommended packages
   - Version compatibility issues

3. **Folder & Component Structure**
   - Nx/folder-per-feature alignment
   - Shared code organization
   - Import/export patterns
   - Lazy loading opportunities
   - Code duplication

4. **Angular Best Practices**
   - Standalone component usage
   - Signal-based reactivity
   - OnPush change detection opportunities
   - Hydration patterns
   - Testing coverage gaps

Present findings as a concise prioritized list grouped by category:
- **[HIGH]** Most impactful (performance, security, maintainability)
- **[MED]** Moderate impact improvements
- **[LOW]** Nice-to-have refinements

Format each item as:
`- [PRIORITY] <Title>: <Brief explanation of issue/recommendation>`

Do NOT make any changes. Only report findings.

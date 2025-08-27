# Portfolio Project Structure

## 📁 New Organized Structure

```
hen-heang-portfolio/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (routes)/                 # Route groups
│   │   ├── 📁 about/
│   │   ├── 📁 projects/
│   │   └── 📁 contact/
│   ├── 📁 api/                      # API routes
│   ├── 📁 globals.css
│   ├── 📁 layout.tsx
│   └── 📁 page.tsx
│
├── 📁 src/                          # Source code
│   ├── 📁 components/               # React components
│   │   ├── 📁 ui/                   # Reusable UI components
│   │   │   ├── 📁 buttons/
│   │   │   ├── 📁 cards/
│   │   │   ├── 📁 forms/
│   │   │   └── 📁 layout/
│   │   ├── 📁 sections/             # Page sections
│   │   │   ├── 📁 hero/
│   │   │   ├── 📁 about/
│   │   │   ├── 📁 projects/
│   │   │   ├── 📁 skills/
│   │   │   ├── 📁 education/
│   │   │   ├── 📁 achievements/
│   │   │   └── 📁 contact/
│   │   ├── 📁 features/             # Feature-specific components
│   │   │   ├── 📁 navigation/
│   │   │   ├── 📁 theme/
│   │   │   └── 📁 animations/
│   │   └── 📁 icons/                # Icon components
│   │
│   ├── 📁 data/                     # Static data
│   │   ├── 📁 achievements/
│   │   ├── 📁 projects/
│   │   ├── 📁 skills/
│   │   ├── 📁 education/
│   │   └── 📁 personal/
│   │
│   ├── 📁 lib/                      # Utilities and helpers
│   │   ├── 📁 utils/
│   │   ├── 📁 constants/
│   │   ├── 📁 types/
│   │   └── 📁 hooks/
│   │
│   ├── 📁 styles/                   # Global styles
│   │   ├── 📁 components/
│   │   └── 📁 themes/
│   │
│   └── 📁 providers/                # Context providers
│
├── 📁 public/                       # Static assets
│   ├── 📁 images/
│   │   ├── 📁 projects/
│   │   ├── 📁 achievements/
│   │   └── 📁 profile/
│   ├── 📁 icons/
│   └── 📁 documents/
│
├── 📁 docs/                         # Documentation
│   ├── 📁 components/
│   ├── 📁 data/
│   └── 📁 deployment/
│
└── 📁 config/                       # Configuration files
    ├── 📁 eslint/
    ├── 📁 tailwind/
    └── 📁 next/
```

## 🎯 Benefits of New Structure

### **1. Clear Separation of Concerns**
- **UI Components**: Reusable, generic components
- **Section Components**: Page-specific sections
- **Feature Components**: Complex feature implementations
- **Data**: Organized by domain/feature

### **2. Better Maintainability**
- **Consistent naming**: All kebab-case
- **Logical grouping**: Related files together
- **Scalable structure**: Easy to add new features
- **Clear imports**: Shorter, more intuitive paths

### **3. Improved Developer Experience**
- **Faster navigation**: Know exactly where to find files
- **Better code splitting**: Natural boundaries for lazy loading
- **Easier testing**: Organized test structure
- **Cleaner imports**: No more long relative paths

### **4. Enhanced Performance**
- **Better tree shaking**: Organized imports
- **Optimized bundling**: Logical code splitting
- **Faster builds**: Clearer dependency graph

## 📋 Migration Steps

1. **Create new directory structure**
2. **Move and rename files**
3. **Update import paths**
4. **Reorganize data files**
5. **Update configuration files**
6. **Test all functionality**
7. **Update documentation**

## 🔄 File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- **Files**: `kebab-case.ts` (e.g., `personal-info.ts`)
- **Directories**: `kebab-case` (e.g., `hero-section/`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `API_ENDPOINTS`)
- **Types**: `PascalCase` (e.g., `ProjectData`)

## 📦 Component Categories

### **UI Components** (`src/components/ui/`)
- Reusable, generic components
- No business logic
- Highly configurable
- Example: `Button`, `Card`, `Modal`

### **Section Components** (`src/components/sections/`)
- Page-specific sections
- Business logic included
- Data integration
- Example: `HeroSection`, `ProjectsSection`

### **Feature Components** (`src/components/features/`)
- Complex feature implementations
- Multiple sub-components
- State management
- Example: `Navigation`, `ThemeToggle`

## 🗂️ Data Organization

### **By Domain** (`src/data/`)
- **achievements/**: Certificates, awards, graduations
- **projects/**: Portfolio projects
- **skills/**: Technical skills and categories
- **education/**: Academic background
- **personal/**: Personal information, contact details

### **Benefits**
- **Domain-driven**: Related data together
- **Easy to find**: Clear file locations
- **Scalable**: Add new domains easily
- **Type-safe**: Domain-specific types

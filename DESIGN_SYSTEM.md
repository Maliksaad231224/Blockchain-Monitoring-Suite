# SmartMonitor UI Design Guide

## 🎨 Design System Overview

This document outlines the visual design system and component standards for SmartMonitor.

## Color Palette

### Primary Colors
```
Blue:    #2563EB (rgb(37, 99, 235))
Purple:  #A855F7 (rgb(168, 85, 247))
Gradient: from-blue-600 to-purple-600
```

### Neutral Colors
```
White:      #FFFFFF
Gray 50:    #F9FAFB
Gray 100:   #F3F4F6
Gray 200:   #E5E7EB
Gray 300:   #D1D5DB
Gray 600:   #4B5563
Gray 700:   #374151
Gray 900:   #111827
```

### Status Colors
```
Success:  #10B981 (Green)
Warning:  #F59E0B (Amber)
Error:    #EF4444 (Red)
Info:     #2563EB (Blue)
```

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

### Font Sizes
```
Display:      text-4xl (36px) - Page titles
Heading 1:    text-3xl (30px) - Section headings
Heading 2:    text-2xl (24px) - Subsection headings
Heading 3:    text-xl (20px) - Card titles
Body Large:   text-base (16px) - Body text
Body Normal:  text-sm (14px) - Secondary text
Caption:      text-xs (12px) - Labels, captions
Mono:         font-mono - Code, addresses
```

### Font Weights
```
Bold:        font-bold (700)
Semibold:    font-semibold (600)
Medium:      font-medium (500)
Regular:     font-normal (400)
```

## Spacing System

### Base Unit: 4px (8px = 2 units)

```
0px:    0
2px:    0.5 unit
4px:    1 unit
8px:    2 units
12px:   3 units
16px:   4 units
24px:   6 units
32px:   8 units
40px:   10 units
48px:   12 units
64px:   16 units
```

### Padding Examples
- Card: `p-6` (24px all sides)
- Header: `px-6 py-4` (24px horizontal, 16px vertical)
- Button: `px-4 py-2` (16px horizontal, 8px vertical)

### Margin Examples
- Section: `mb-8` (32px)
- Component: `gap-4` (16px between items)
- Text: `mt-2` (8px above)

## Components

### Buttons

#### Primary Button
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                   text-white font-bold rounded-lg hover:shadow-lg 
                   transition-all duration-200">
  Action
</button>
```

**Sizes:**
- Small: `px-3 py-1.5 text-sm`
- Medium: `px-4 py-2 text-base`
- Large: `px-6 py-3 text-lg`

#### Secondary Button
```jsx
<button className="px-4 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 
                   font-bold rounded-lg transition-all">
  Cancel
</button>
```

#### Ghost Button
```jsx
<button className="px-4 py-2 text-gray-700 hover:bg-gray-100 
                   border border-gray-300 font-bold rounded-lg">
  Link
</button>
```

### Cards

```jsx
<div className="bg-white rounded-lg border border-gray-200 
                hover:shadow-lg hover:border-gray-300 
                transition-all duration-200">
  {/* Content */}
</div>
```

**Card Structure:**
```jsx
<Card>
  <CardHeader className="border-b border-gray-200">
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className="pt-6">
    {/* Body content */}
  </CardContent>
  <CardFooter className="border-t border-gray-200">
    {/* Actions */}
  </CardFooter>
</Card>
```

### Input Fields

```jsx
<input className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-colors" />
```

### Icons

Using Lucide React icons:

```jsx
import { Activity, Zap, TrendingUp, Shield } from 'lucide-react';

<Activity className="w-5 h-5 text-blue-600" />
<Zap className="w-5 h-5 text-yellow-600" />
```

**Icon Sizes:**
- `w-3 h-3` - 12px (captions)
- `w-4 h-4` - 16px (small)
- `w-5 h-5` - 20px (default)
- `w-6 h-6` - 24px (medium)
- `w-8 h-8` - 32px (large)

### Tables

```jsx
<table className="w-full">
  <thead>
    <tr className="border-b border-gray-200">
      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
        Column
      </th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-4 py-4 text-sm text-gray-900">Data</td>
    </tr>
  </tbody>
</table>
```

### Badges

```jsx
{/* Success Badge */}
<span className="inline-flex items-center px-3 py-1 rounded-full 
                 text-xs font-medium bg-green-100 text-green-700">
  Success
</span>

{/* Warning Badge */}
<span className="inline-flex items-center px-3 py-1 rounded-full 
                 text-xs font-medium bg-yellow-100 text-yellow-700">
  Warning
</span>

{/* Error Badge */}
<span className="inline-flex items-center px-3 py-1 rounded-full 
                 text-xs font-medium bg-red-100 text-red-700">
  Error
</span>
```

## Layouts

### Header
```jsx
<header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Content */}
    </div>
  </div>
</header>
```

### Sidebar
```jsx
<aside className="w-64 bg-white border-r border-gray-200">
  <div className="p-6">
    {/* Navigation */}
  </div>
</aside>
```

### Container
```jsx
<div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
  {/* Content */}
</div>
```

### Grid
```jsx
{/* Two columns */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Items */}
</div>

{/* Three columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>

{/* Four columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Items */}
</div>
```

## Animations & Transitions

### Smooth Transitions
```jsx
className="transition-all duration-200"
className="transition-colors duration-200"
className="transition-transform duration-300"
```

### Hover Effects
```jsx
// Lift and shadow
className="hover:shadow-lg hover:border-gray-300 transition-all"

// Color change
className="hover:bg-gray-100 transition-colors"

// Scale
className="hover:scale-105 transition-transform"
```

### Loading State
```jsx
<div className="animate-spin">
  <Loader2 className="w-5 h-5" />
</div>
```

### Pulse Animation
```jsx
<div className="animate-pulse">
  <div className="h-12 bg-gray-300 rounded"></div>
</div>
```

## Responsive Design

### Breakpoints
```
xs: default (no prefix)
sm: 640px  - @media (min-width: 640px)
md: 768px  - @media (min-width: 768px)
lg: 1024px - @media (min-width: 1024px)
xl: 1280px - @media (min-width: 1280px)
2xl: 1536px - @media (min-width: 1536px)
```

### Example: Responsive Padding
```jsx
className="px-4 sm:px-6 lg:px-8"
// 16px on mobile, 24px on tablet, 32px on desktop
```

### Example: Responsive Grid
```jsx
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
// 1 column on mobile, 2 on tablet, 4 on desktop
```

## Accessibility

### Focus States
```jsx
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
```

### Semantic HTML
- Use `<button>` for clickable elements
- Use `<a>` for navigation
- Use `<label>` for form labels
- Use proper heading hierarchy (`h1`, `h2`, `h3`)

### Color Contrast
- Text on background: 4.5:1 minimum
- UI components: 3:1 minimum
- Links: Underlined or styled

### ARIA Labels
```jsx
<button aria-label="Close menu">
  <X className="w-5 h-5" />
</button>
```

## Best Practices

1. **Consistency** - Use the same spacing, colors, and components
2. **Readability** - Enough whitespace and contrast
3. **Performance** - Optimize images and animations
4. **Responsive** - Test on all screen sizes
5. **Accessibility** - Follow WCAG guidelines
6. **Feedback** - Hover, focus, and loading states
7. **Hierarchy** - Clear visual hierarchy with typography and spacing

## Examples

### Card with Stats
```jsx
<Card>
  <CardContent className="pt-6">
    <div className="flex items-center gap-3">
      <Activity className="w-5 h-5 text-blue-600" />
      <div>
        <p className="text-sm text-gray-600">Transactions</p>
        <p className="text-2xl font-bold text-gray-900">2.4M</p>
      </div>
    </div>
  </CardContent>
</Card>
```

### List with Actions
```jsx
<div className="divide-y divide-gray-200">
  {items.map((item) => (
    <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
      <span className="text-gray-900 font-medium">{item.name}</span>
      <button className="text-blue-600 hover:text-blue-700">
        Edit
      </button>
    </div>
  ))}
</div>
```

### Form Input
```jsx
<div>
  <label className="block text-sm font-medium text-gray-900 mb-2">
    Email
  </label>
  <input
    type="email"
    placeholder="you@example.com"
    className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-transparent"
  />
</div>
```

This design system ensures consistency, accessibility, and a professional appearance across the entire SmartMonitor platform.

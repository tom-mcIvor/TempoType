# TempoType Style Guide

## Design Philosophy

**Material Design Meets Typing Excellence** - Clean, accessible interface using Material Tailwind components that puts typing practice at the center of attention.

## Component Library

### Material Tailwind Components
We use Material Tailwind React components for consistent, accessible UI elements:

```jsx
import {
  Button,
  Card,
  Typography,
  Input,
  Progress,
  Alert,
  Dialog,
  IconButton
} from "@material-tailwind/react";
```

## Color Palette

### Material Tailwind Colors
- **Primary**: `color="blue"` - Main actions, progress indicators
- **Success**: `color="green"` - Correct typing, achievements
- **Error**: `color="red"` - Mistakes, warnings
- **Warning**: `color="amber"` - Cautions, notifications
- **Secondary**: `color="gray"` - Secondary actions, text

### Custom Colors (when needed)
- **Typing Correct**: `bg-green-50 text-green-700`
- **Typing Error**: `bg-red-50 text-red-700`
- **Current Position**: `bg-blue-50 border-l-4 border-blue-500`

## Typography

### Material Tailwind Typography
```jsx
<Typography variant="h1">Page Title</Typography>
<Typography variant="h2">Section Header</Typography>
<Typography variant="h3">Subsection</Typography>
<Typography variant="lead">Important text</Typography>
<Typography variant="paragraph">Body text</Typography>
<Typography variant="small">Captions</Typography>
```

### Font Weights
- **Bold**: `className="font-bold"` - Headings
- **Semibold**: `className="font-semibold"` - Subheadings
- **Medium**: `className="font-medium"` - Labels
- **Normal**: `className="font-normal"` - Body text

## Component Usage

### Buttons
```jsx
// Primary Action
<Button color="blue" size="lg">
  Start Typing
</Button>

// Secondary Action
<Button variant="outlined" color="gray">
  Settings
</Button>

// Icon Button
<IconButton color="blue" variant="text">
  <PlayIcon className="h-5 w-5" />
</IconButton>
```

### Cards
```jsx
<Card className="p-6">
  <Typography variant="h5" color="blue-gray" className="mb-2">
    Session Results
  </Typography>
  <Typography>
    Your typing session details...
  </Typography>
</Card>
```

### Input Fields
```jsx
<Input
  label="Enter text here"
  size="lg"
  className="font-mono"
  error={hasError}
/>
```

### Progress Indicators
```jsx
<Progress 
  value={completionPercentage} 
  color="blue"
  className="mb-4"
/>
```

### Alerts
```jsx
<Alert color="green" className="mb-4">
  Great job! Your accuracy improved!
</Alert>

<Alert color="red" className="mb-4">
  Too many errors. Slow down and focus on accuracy.
</Alert>
```

## Layout System

### Container
```jsx
<div className="container mx-auto px-4 max-w-6xl">
  {/* Content */}
</div>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### Typing Interface Layout
```jsx
<div className="max-w-4xl mx-auto p-6">
  <Card className="p-8">
    {/* Typing content */}
  </Card>
</div>
```

## Typing-Specific Styles

### Text Display
```jsx
// Current word being typed
<span className="bg-blue-50 px-1 border-l-4 border-blue-500">
  current
</span>

// Correct character
<span className="text-green-700 bg-green-50">a</span>

// Incorrect character
<span className="text-red-700 bg-red-50">x</span>

// Completed text
<span className="text-gray-500">completed text</span>
```

### Statistics Display
```jsx
<div className="grid grid-cols-3 gap-4">
  <Card className="p-4 text-center">
    <Typography variant="h3" color="blue">
      {wpm}
    </Typography>
    <Typography variant="small" color="gray">
      WPM
    </Typography>
  </Card>
  
  <Card className="p-4 text-center">
    <Typography variant="h3" color="green">
      {accuracy}%
    </Typography>
    <Typography variant="small" color="gray">
      Accuracy
    </Typography>
  </Card>
  
  <Card className="p-4 text-center">
    <Typography variant="h3" color="amber">
      {errors}
    </Typography>
    <Typography variant="small" color="gray">
      Errors
    </Typography>
  </Card>
</div>
```

## Audio Controls

### Player Interface
```jsx
<Card className="p-4">
  <div className="flex items-center gap-4">
    <IconButton 
      color="blue" 
      size="lg"
      onClick={togglePlay}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </IconButton>
    
    <div className="flex-1">
      <Progress value={progress} color="blue" />
    </div>
    
    <Typography variant="small" color="gray">
      {currentTime} / {duration}
    </Typography>
  </div>
</Card>
```

## Responsive Design

### Breakpoints
- **Mobile**: `< 640px` - Single column layout
- **Tablet**: `640px - 1024px` - Adjusted spacing
- **Desktop**: `> 1024px` - Full layout

### Mobile Adaptations
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Responsive grid */}
</div>

<Button 
  size="sm" 
  className="w-full md:w-auto"
>
  Mobile-friendly button
</Button>
```

## Accessibility

### Material Tailwind Built-ins
- All components include proper ARIA attributes
- Keyboard navigation is built-in
- Focus management is handled automatically
- Color contrast meets WCAG standards

### Additional Considerations
```jsx
// Screen reader support
<Typography className="sr-only">
  Current typing speed: {wpm} words per minute
</Typography>

// Focus management
<Input
  label="Type here"
  className="focus:ring-2 focus:ring-blue-500"
  autoFocus
/>
```

## Animation & Transitions

### Material Tailwind Animations
- Components include smooth transitions by default
- Hover states are built-in
- Loading states are provided

### Custom Animations
```jsx
// Typing cursor
<span className="animate-pulse border-r-2 border-blue-500">|</span>

// Success feedback
<div className="transition-all duration-300 transform hover:scale-105">
  <Alert color="green">Success!</Alert>
</div>
```

## Theme Customization

### Dark Mode Support
Material Tailwind supports dark mode automatically:

```jsx
<ThemeProvider>
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    {/* App content */}
  </div>
</ThemeProvider>
```

### Custom Theme Colors
In `tailwind.config.js`:
```javascript
module.exports = withMT({
  theme: {
    extend: {
      colors: {
        'tempo-blue': '#1e40af',
        'tempo-green': '#059669',
      }
    }
  }
});
```

## Best Practices

### Do's
- ✅ Use Material Tailwind components for consistency
- ✅ Maintain proper color contrast for typing feedback
- ✅ Keep animations subtle and purposeful
- ✅ Test keyboard navigation thoroughly
- ✅ Use semantic HTML with Material components

### Don'ts
- ❌ Mix custom components with Material Tailwind unnecessarily
- ❌ Override Material Tailwind styles without good reason
- ❌ Ignore built-in accessibility features
- ❌ Use too many color variants in one interface
- ❌ Forget to test on mobile devices

## Component Examples

### Complete Typing Interface
```jsx
function TypingInterface() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="p-8">
        <Typography variant="h4" className="mb-6 text-center">
          TempoType Practice
        </Typography>
        
        <div className="mb-6">
          <Progress value={progress} color="blue" />
        </div>
        
        <Card className="p-6 bg-gray-50 mb-6">
          <Typography className="font-mono text-lg leading-relaxed">
            {renderTypingText()}
          </Typography>
        </Card>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard title="WPM" value={wpm} color="blue" />
          <StatCard title="Accuracy" value={`${accuracy}%`} color="green" />
          <StatCard title="Errors" value={errors} color="red" />
        </div>
        
        <div className="flex justify-center gap-4">
          <Button color="blue" size="lg">
            Start Over
          </Button>
          <Button variant="outlined" color="gray">
            Settings
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

---

*Style Guide Version: 2.0 (Material Tailwind Edition)*  
*Last Updated: 2025-09-30*  
*Component Library: Material Tailwind React*
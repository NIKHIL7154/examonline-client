interface Step {
  name: string
  index: number
}

interface SidebarProps {
  activeStep: Step;
  onStepClick: (index: number) => void;
}

const initialSteps = [
  { name: "System Checks",index:0},
  { name: "Environment Setup",index:1 },
  { name: "Take Photo",index:2 },
  { name: "Start Exam",index:3 }
];

export default function Sidebar({ activeStep, onStepClick }: SidebarProps) {
  return (
    <nav className="w-full border-r border-gray-200 md:w-64">
      {initialSteps.map((step, index) => (
        <div
          key={index}
          onClick={() => onStepClick(index)}
          className={`cursor-pointer hover:bg-green-100 border-b border-gray-200 p-6 ${step.name==activeStep.name ? "bg-[#E8FFE8]" : "bg-white"}`}
        >
          <span className="text-lg text-gray-600">{step.name}</span>
        </div>
      ))}
    </nav>
  )
}

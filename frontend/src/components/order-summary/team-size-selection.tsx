import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface TeamSizeSelectionProps {
  teamSize: string;
  setTeamSize: (size: string) => void;
}

const TeamSizeSelection: React.FC<TeamSizeSelectionProps> = ({ teamSize, setTeamSize }) => (
  <div>
    <h2 className="font-semibold mb-1 mt-6">Size Matters</h2>
    <p className="text-sm text-muted-foreground mb-3">
      Choose the right fit for your team!
    </p>

    <RadioGroup
      value={teamSize}
      onValueChange={setTeamSize}
      className="flex gap-6"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="1-50" id="size-1" />
        <label htmlFor="size-1" className="text-sm">
          1 - 50
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="51-100" id="size-2" />
        <label htmlFor="size-2" className="text-sm">
          51 - 100
        </label>
      </div>
    </RadioGroup>
  </div>
);

export default TeamSizeSelection;
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type StatsCardsProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const StatsCards = ({ title, value, icon }: StatsCardsProps) => {
  return (
    <div className="w-full max-w-xs">
      <Card className="max-w-xs">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="h-4 w-4 text-primary">{icon}</div>
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

/** Static demo — illustrates the shape of scored practice rows, not live data. */
const DEMO_ROWS = [
  {
    practice: "Demo: Riverside Dental Group",
    market: "Phoenix, AZ",
    score: "74",
    priority: "High",
    angle: "Visibility + outreach angle",
  },
  {
    practice: "Demo: Summit Smiles",
    market: "Phoenix, AZ",
    score: "68",
    priority: "Medium",
    angle: "Growth signal (illustration)",
  },
  {
    practice: "Demo: City Center Dentistry",
    market: "Phoenix, AZ",
    score: "63",
    priority: "Medium",
    angle: "Listing completeness (illustration)",
  },
];

export function MarketSearchPreview() {
  return (
    <Card className="border border-dashed border-slate-300 bg-slate-50/80">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-slate-800">What you&apos;ll see after you search</CardTitle>
        <p className="text-sm text-slate-600">
          Illustrative rows only. Your run pulls live local practices for the area you choose, then scores and prioritizes
          them for outreach.
        </p>
      </CardHeader>
      <CardContent className="p-0 sm:px-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Practice (demo)</TableHead>
                <TableHead>Market</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="min-w-[140px]">Angle (illustration)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_ROWS.map((row) => (
                <TableRow key={row.practice}>
                  <TableCell className="font-medium text-slate-800">{row.practice}</TableCell>
                  <TableCell className="text-sm">{row.market}</TableCell>
                  <TableCell className="tabular-nums">{row.score}</TableCell>
                  <TableCell>
                    <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                      {row.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-slate-600">{row.angle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

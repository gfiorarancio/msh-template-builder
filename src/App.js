import React from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectItem } from "./components/ui/select";

function App() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">MSH Template Builder</h1>
          <div className="space-y-4">
            <Input placeholder="Game Name" />
            <Input placeholder="Host Name" />
            <Input placeholder="Donor" />
            <Textarea placeholder="Game Description" />
            <Select>
              <SelectItem value="1">1 Winner</SelectItem>
              <SelectItem value="2">2 Winners</SelectItem>
              <SelectItem value="3">3 Winners</SelectItem>
            </Select>
            <Button>Generate Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

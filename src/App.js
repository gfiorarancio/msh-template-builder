
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectItem } from "./components/ui/select";

function App() {
  const [game, setGame] = useState("");
  const [host, setHost] = useState("");
  const [donor, setDonor] = useState("");
  const [description, setDescription] = useState("");
  const [winners, setWinners] = useState("1");
  const [template, setTemplate] = useState("");

  const generateTemplate = () => {
    const formatted = `Let’s go on a ${game} Adventure!\n\n» **Host:** ${host}\n» **Donor:** ${donor}\n» **# of Winners:** ${winners}\n» **Prize:** ${description}\n\n🔔 Winner will have **1 HOUR** to open a 🎟️ • \`TICKETS-PRIZE-CLAIM\` to claim prize.\n\n📣 Big thank you to the donor for this generous donation`;
    setTemplate(formatted);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(template);
    alert("Template copied to clipboard!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">MSH Template Builder</h1>
          <div className="space-y-4">
            <Select value={game} onChange={(e) => setGame(e.target.value)}>
              <SelectItem value="">Select Game Type</SelectItem>
              <SelectItem value="4 ⭐">4 ⭐</SelectItem>
              <SelectItem value="Bingo 🎱">Bingo 🎱</SelectItem>
              <SelectItem value="Raffle 🎟️">Raffle 🎟️</SelectItem>
              <SelectItem value="Trivia 🧠">Trivia 🧠</SelectItem>
              <SelectItem value="Flash ⚡">Flash ⚡</SelectItem>
            </Select>
            <Input placeholder="Host Name" value={host} onChange={(e) => setHost(e.target.value)} />
            <Input placeholder="Donor" value={donor} onChange={(e) => setDonor(e.target.value)} />
            <Textarea placeholder="Game Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Select value={winners} onChange={(e) => setWinners(e.target.value)}>
              <SelectItem value="1">1 Winner</SelectItem>
              <SelectItem value="2">2 Winners</SelectItem>
              <SelectItem value="3">3 Winners</SelectItem>
            </Select>
            <Button onClick={generateTemplate}>Generate Template</Button>
          </div>
        </CardContent>
      </Card>

      {template && (
        <Card>
          <CardContent className="space-y-4">
            <Textarea readOnly value={template} className="h-60" />
            <Button onClick={copyToClipboard}>Copy Template</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;

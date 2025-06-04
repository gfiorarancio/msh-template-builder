
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectItem } from "./components/ui/select";

const emojiOptions = ["🎮", "⭐", "🔥", "🎉", "💥", "➡️", "🔹", "⏩"];

function App() {
  const [game, setGame] = useState("");
  const [host, setHost] = useState("");
  const [donor, setDonor] = useState("");
  const [winners, setWinners] = useState("1");
  const [description, setDescription] = useState("");
  const [headerEmoji, setHeaderEmoji] = useState("🎮");
  const [arrowEmoji, setArrowEmoji] = useState("➡️");
  const [output, setOutput] = useState("");

  const generateTemplate = () => {
    const template = `${headerEmoji}  ${game}  ${headerEmoji}\n\n` +
      `${arrowEmoji} **Host:** ${host}\n\n` +
      `${arrowEmoji} **Donor:** ${donor}\n\n` +
      `${arrowEmoji} **# of Winners:** ${winners}\n\n` +
      `${arrowEmoji} **Prize:** ${description}\n\n` +
      `🔔 Winner will have **1 HOUR** to open a 🎟️ • \`TICKETS-PRIZE-CLAIM\` to claim prize.\n\n` +
      `📣 Big thank you to the donor for this generous donation`;
    setOutput(template);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 font-sans">
      <h1 className="text-3xl font-bold text-center">🎮 MSH Template Generator</h1>

      <Card>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Header Emoji</label>
              <Select value={headerEmoji} onChange={(e) => setHeaderEmoji(e.target.value)}>
                {emojiOptions.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <label className="font-medium">Arrow Emoji</label>
              <Select value={arrowEmoji} onChange={(e) => setArrowEmoji(e.target.value)}>
                {emojiOptions.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <label className="font-medium">Game</label>
            <Input placeholder="Enter game name" value={game} onChange={(e) => setGame(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Host</label>
              <Input placeholder="Enter host name" value={host} onChange={(e) => setHost(e.target.value)} />
            </div>
            <div>
              <label className="font-medium">Donor</label>
              <Input placeholder="Enter donor name" value={donor} onChange={(e) => setDonor(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium"># of Winners</label>
              <Select value={winners} onChange={(e) => setWinners(e.target.value)}>
                <SelectItem value="1">1 Winner</SelectItem>
                <SelectItem value="2">2 Winners</SelectItem>
                <SelectItem value="3">3 Winners</SelectItem>
              </Select>
            </div>
            <div>
              <label className="font-medium">Prize Description</label>
              <Textarea placeholder="Enter prize details" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </div>

          <Button className="w-full text-lg py-3" onClick={generateTemplate}>🚀 Generate Template</Button>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardContent>
            <Textarea readOnly value={output} className="h-60" />
            <Button className="mt-2" onClick={() => { navigator.clipboard.writeText(output); alert('Copied!'); }}>📋 Copy Template</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default App;

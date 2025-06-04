import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectItem } from "./components/ui/select";

const emojiOptions = [
  "🎮", "🕹️", "🎯", "🔥", "⭐", "🚀", "🏆", "💎", "👾", "🎁",
  "⚡", "📣", "✨", "🪄", "🔮", "🎉", "💥", "🔔", "🧩", "🛡️",
  "🧵", "📜", "🎓", "🌟", "💰", "📦", "🏅", "🚨", "🦄", "🎬",
  "🐉", "🎶", "🪙", "🖼️", "📍", "🧠", "🎃", "❄️", "🎄", "🌈",
  "🧸", "🪄", "📢", "📬", "📫", "🎨", "👑", "🥇", "🥈", "🥉"
];

function App() {
  const [game, setGame] = useState("");
  const [host, setHost] = useState("");
  const [donor, setDonor] = useState("");
  const [description, setDescription] = useState("");
  const [winners, setWinners] = useState("1");
  const [headerEmoji, setHeaderEmoji] = useState("🎮");
  const [arrowEmoji, setArrowEmoji] = useState("➡️");
  const [output, setOutput] = useState("");

  const generateOutput = () => {
    const result = `${headerEmoji}  ${game}  ${headerEmoji}\n\n` +
      `${arrowEmoji} **Host:** ${host}\n\n` +
      `${arrowEmoji} **Donor:** ${donor}\n\n` +
      `${arrowEmoji} **# of Winners:** ${winners}\n\n` +
      `${arrowEmoji} **Prize:** ${description}\n\n` +
      `🔔 Winner will have **1 HOUR** to open a 🎟️ • \`TICKETS-PRIZE-CLAIM\` to claim prize.\n\n` +
      `📣 Big thank you to the donor for this generous donation`;

    setOutput(result);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">MSH Template Builder</h1>

          <Select value={headerEmoji} onValueChange={setHeaderEmoji}>
            {emojiOptions.map((emoji) => (
              <SelectItem key={emoji} value={emoji}>{emoji} Header</SelectItem>
            ))}
          </Select>

          <Select value={arrowEmoji} onValueChange={setArrowEmoji}>
            {emojiOptions.map((emoji) => (
              <SelectItem key={emoji} value={emoji}>{emoji} Arrow</SelectItem>
            ))}
          </Select>

          <Input placeholder="Game Name" value={game} onChange={(e) => setGame(e.target.value)} />
          <Input placeholder="Host Name" value={host} onChange={(e) => setHost(e.target.value)} />
          <Input placeholder="Donor" value={donor} onChange={(e) => setDonor(e.target.value)} />
          <Textarea placeholder="Prize Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <Select value={winners} onValueChange={setWinners}>
            <SelectItem value="1">1 Winner</SelectItem>
            <SelectItem value="2">2 Winners</SelectItem>
            <SelectItem value="3">3 Winners</SelectItem>
          </Select>

          <Button onClick={generateOutput}>Generate Template</Button>

          {output && (
            <Textarea
              className="bg-gray-100 text-sm"
              rows={10}
              value={output}
              readOnly
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

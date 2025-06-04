
import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Select, SelectItem } from "./components/ui/select";

const emojis = ["🎮", "⭐", "🔥", "🎉", "💥", "➡️", "🔹", "⏩"];

function App() {{
  const [game, setGame] = useState("");
  const [host, setHost] = useState("");
  const [donor, setDonor] = useState("");
  const [winners, setWinners] = useState("1");
  const [description, setDescription] = useState("");
  const [headerEmoji, setHeaderEmoji] = useState("🎮");
  const [arrowEmoji, setArrowEmoji] = useState("➡️");
  const [output, setOutput] = useState("");

  const generateTemplate = () => {{
    const template = `${{headerEmoji}}  ${{game}}  ${{headerEmoji}}

` +
      `${{arrowEmoji}} **Host:** ${{host}}

` +
      `${{arrowEmoji}} **Donor:** ${{donor}}

` +
      `${{arrowEmoji}} **# of Winners:** ${{winners}}

` +
      `${{arrowEmoji}} **Prize:** ${{description}}

` +
      `🔔 Winner will have **1 HOUR** to open a 🎟️ • \`TICKETS-PRIZE-CLAIM\` to claim prize.

` +
      `📣 Big thank you to the donor for this generous donation`;
    setOutput(template);
  }};

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">MSH Template Builder</h1>
          <div className="space-y-4">
            <Select value={{headerEmoji}} onChange={{(e) => setHeaderEmoji(e.target.value)}}>
              {{emojis.map((e) => (
                <SelectItem key={{e}} value={{e}}>{{e}} Header</SelectItem>
              ))}}
            </Select>
            <Select value={{arrowEmoji}} onChange={{(e) => setArrowEmoji(e.target.value)}}>
              {{emojis.map((e) => (
                <SelectItem key={{e}} value={{e}}>{{e}} Arrow</SelectItem>
              ))}}
            </Select>
            <Input placeholder="Game Name" value={{game}} onChange={{(e) => setGame(e.target.value)}} />
            <Input placeholder="Host Name" value={{host}} onChange={{(e) => setHost(e.target.value)}} />
            <Input placeholder="Donor" value={{donor}} onChange={{(e) => setDonor(e.target.value)}} />
            <Textarea placeholder="Game Description" value={{description}} onChange={{(e) => setDescription(e.target.value)}} />
            <Select value={{winners}} onChange={{(e) => setWinners(e.target.value)}}>
              <SelectItem value="1">1 Winner</SelectItem>
              <SelectItem value="2">2 Winners</SelectItem>
              <SelectItem value="3">3 Winners</SelectItem>
            </Select>
            <Button onClick={{generateTemplate}}>Generate Template</Button>
          </div>
        </CardContent>
      </Card>
      {{output && (
        <Card>
          <CardContent>
            <pre className="whitespace-pre-wrap">{{output}}</pre>
          </CardContent>
        </Card>
      )}}
    </div>
  );
}}

export default App;

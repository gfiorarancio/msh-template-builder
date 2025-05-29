import React, { useState, useEffect } from "react";
import { Copy, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const presets = {
  bingo: {
    title: "🏆 Sticker Bingo Challenge",
    description: "React quickly to numbers and mark your board! First to bingo wins big!",
  },
  raffle: {
    title: "🎟️ Sticker Raffle Time!",
    description: "Enter to win exclusive stickers! Winners chosen at random.",
  },
  trivia: {
    title: "🧠 Sticker Trivia Showdown",
    description: "Answer questions and climb the leaderboard! Prizes for top scorers.",
  },
  flash: {
    title: "⚡ Flash Sticker Giveaway",
    description: "First to claim wins! Stay alert and be quick!",
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [gameType, setGameType] = useState("");
  const [title, setTitle] = useState("");
  const [host, setHost] = useState("");
  const [donor, setDonor] = useState("");
  const [winners, setWinners] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) loadTemplates(currentUser.uid);
    });
  }, []);

  useEffect(() => {
    if (presets[gameType]) {
      setTitle(presets[gameType].title);
      setDescription(presets[gameType].description);
    }
  }, [gameType]);

  const preview = `${title}\n🎮 Hosted by ${host}\n🎁 Donated by ${donor}\n👥 ${winners} Winner${winners === "1" ? "" : "s"}\n📜 ${description}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preview);
  };

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  const saveTemplate = async () => {
    if (!user) return;
    const templateRef = doc(collection(db, "users", user.uid, "templates"));
    await setDoc(templateRef, {
      title,
      host,
      donor,
      winners,
      description,
      gameType,
      created: new Date(),
    });
    loadTemplates(user.uid);
  };

  const deleteTemplate = async (templateId) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "templates", templateId));
    loadTemplates(user.uid);
  };

  const loadTemplates = async (uid) => {
    const snapshot = await getDocs(collection(db, "users", uid, "templates"));
    const loaded = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTemplates(loaded);
  };

  const loadTemplate = (template) => {
    setGameType(template.gameType);
    setTitle(template.title);
    setHost(template.host);
    setDonor(template.donor);
    setWinners(template.winners);
    setDescription(template.description);
  };

  return (
    <div className="p-4 max-w-xl mx-auto font-sans space-y-6">
      <h1 className="text-2xl font-bold">🎲 MSH Game Template Builder</h1>

      {user ? (
        <div className="flex items-center justify-between">
          <p className="text-sm">Signed in as {user.displayName}</p>
          <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={handleSignIn}>Sign in with Google</Button>
      )}

      <Card>
        <CardContent className="space-y-4 pt-4">
          <Select onValueChange={setGameType} value={gameType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Game Type" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(presets).map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Input placeholder="Host" value={host} onChange={(e) => setHost(e.target.value)} />
          <Input placeholder="Donor" value={donor} onChange={(e) => setDonor(e.target.value)} />
          <Input placeholder="Number of Winners" type="number" value={winners} onChange={(e) => setWinners(e.target.value)} />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2 pt-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} /> <h2 className="font-medium">Live Preview</h2>
          </div>
          <pre className="whitespace-pre-wrap bg-muted p-2 rounded border text-sm">{preview}</pre>
          <div className="flex gap-2">
            <Button onClick={copyToClipboard} size="sm"><Copy size={16} className="mr-1" /> Copy Template</Button>
            {user && <Button onClick={saveTemplate} size="sm">Save Template</Button>}
          </div>
        </CardContent>
      </Card>

      {user && templates.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold">Saved Templates</h3>
          {templates.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-2 border rounded">
              <button onClick={() => loadTemplate(t)}>{t.title}</button>
              <button onClick={() => deleteTemplate(t.id)}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

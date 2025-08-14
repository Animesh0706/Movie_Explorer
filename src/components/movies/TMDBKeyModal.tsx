import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TMDBKeyModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const STORAGE_KEY = "tmdb_api_key";

export const getStoredTMDBKey = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(STORAGE_KEY) || "";
};

export const setStoredTMDBKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY, key);
};

const TMDBKeyModal = ({ open, onOpenChange }: TMDBKeyModalProps) => {
  const [key, setKey] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) setKey(getStoredTMDBKey());
  }, [open]);

  const handleSave = () => {
    setSaving(true);
    setStoredTMDBKey(key.trim());
    setSaving(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your TMDB API key</DialogTitle>
          <DialogDescription>
            Your key is stored locally in your browser and used to fetch movie data.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="TMDB API Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Button onClick={handleSave} disabled={!key || saving}>
            {saving ? "Saving..." : "Save Key"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TMDBKeyModal;

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle, ArrowRight, ArrowLeft, Camera, User, Briefcase,
  Link2, Shield, Plus, X, Loader2, Globe, Linkedin, Github
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const STEPS = [
  { label: "Personal Info", icon: User },
  { label: "Professional", icon: Briefcase },
  { label: "Linked Accounts", icon: Link2 },
  { label: "Account Security", icon: Shield },
];

const SKILL_SUGGESTIONS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "UI/UX Design",
  "Graphic Design", "Illustrator", "Photoshop", "Figma", "SEO", "Copywriting",
  "Video Editing", "Motion Graphics", "Social Media", "Content Writing",
  "WordPress", "Shopify", "Data Analysis", "Machine Learning",
];

const LANGUAGES = [
  "English", "Spanish", "French", "German", "Portuguese", "Chinese", "Arabic",
  "Japanese", "Russian", "Hindi", "Italian", "Korean",
];

const OCCUPATIONS = [
  "Web Developer", "Mobile Developer", "UI/UX Designer", "Graphic Designer",
  "Copywriter", "Content Strategist", "SEO Specialist", "Digital Marketer",
  "Video Editor", "Motion Designer", "Photographer", "Voiceover Artist",
  "Data Scientist", "AI/ML Engineer", "Business Consultant", "Virtual Assistant",
  "Translator", "Social Media Manager", "Email Marketer", "Project Manager",
];

const SellerSetupPage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Step 1 – Personal Info
  const [fullName, setFullName] = useState(profile?.display_name || "");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState(profile?.bio || "");
  const [country, setCountry] = useState(profile?.country || "");
  const [language, setLanguage] = useState("English");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Step 2 – Professional
  const [occupation, setOccupation] = useState("");
  const [skills, setSkills] = useState<string[]>(profile?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [experience, setExperience] = useState("");

  // Step 3 – Linked Accounts
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  // ─── helpers ─────────────────────────────────────────────────────────────
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const canNext = (): boolean => {
    if (step === 0) return fullName.trim().length >= 2 && bio.trim().length >= 10;
    if (step === 1) return occupation.length > 0 && skills.length >= 1;
    return true; // steps 2 & 3 are optional
  };

  const addSkill = (skill: string) => {
    const s = skill.trim();
    if (s && !skills.includes(s) && skills.length < 15) {
      setSkills(prev => [...prev, s]);
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => setSkills(prev => prev.filter(s => s !== skill));

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Image must be under 5MB", variant: "destructive" });
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatar = async (): Promise<string | null> => {
    if (!avatarFile || !user) return avatarPreview;
    setUploading(true);
    const ext = avatarFile.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, { upsert: true });
    setUploading(false);
    if (error) {
      toast({ title: "Avatar upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);
    return `${publicUrl}?t=${Date.now()}`;
  };

  const handleSubmit = async () => {
    if (!user) return;
    setSubmitting(true);

    const avatarUrl = await uploadAvatar();

    const { error } = await supabase.from("profiles").update({
      display_name: fullName.trim(),
      bio: bio.trim(),
      country: country.trim() || null,
      skills,
      is_seller: true,
      seller_level: "New",
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    }).eq("user_id", user.id);

    setSubmitting(false);

    if (error) {
      toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
      return;
    }

    await refreshProfile();
    toast({ title: "Seller profile created! 🎉", description: "Now let's create your first gig." });
    navigate("/seller/onboarding");
  };

  // ─── step panels ──────────────────────────────────────────────────────────
  const stepVariants = {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Top progress bar */}
      <div className="sticky top-16 z-40 bg-card border-b border-border">
        <Progress value={progress} className="h-1 rounded-none" />
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 overflow-x-auto scrollbar-hide gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => i < step && setStep(i)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors shrink-0 ${
                  i === step
                    ? "bg-primary/10 text-primary"
                    : i < step
                    ? "text-success cursor-pointer hover:bg-muted"
                    : "text-muted-foreground cursor-default"
                }`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  i < step
                    ? "bg-success text-primary-foreground"
                    : i === step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        <AnimatePresence mode="wait">

          {/* ── Step 0: Personal Info ── */}
          {step === 0 && (
            <motion.div key="step0" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">Personal info</h1>
                <p className="text-muted-foreground mt-1">Tell buyers a bit about yourself — this is the first thing they'll see.</p>
              </div>

              <Card className="p-8 shadow-card space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div
                    className="relative h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold font-display shrink-0 overflow-hidden cursor-pointer group border-4 border-border"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span>{fullName ? fullName.slice(0, 2).toUpperCase() : user?.email?.split("@")[0]?.slice(0, 2).toUpperCase() || "?"}</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-5 w-5 text-white" />
                      <span className="text-white text-[10px] mt-1">Change</span>
                    </div>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      {uploading ? <><Loader2 className="h-3.5 w-3.5 animate-spin mr-1" /> Uploading…</> : "Upload Photo"}
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1.5">JPG, PNG or WebP. Max 5MB.</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>

                {/* Full name */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Alex Johnson"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="h-11"
                    maxLength={80}
                  />
                </div>

                {/* Tagline */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Profile Tagline <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </label>
                  <Input
                    placeholder="e.g. Full-Stack Developer · React & Node.js Expert"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    className="h-11"
                    maxLength={120}
                  />
                  <p className="text-xs text-muted-foreground mt-1">A short headline that appears below your name.</p>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Description <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    placeholder="Tell buyers about your background, expertise, and what kind of projects you love working on. Be specific and highlight your unique strengths."
                    rows={5}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    maxLength={600}
                    className="resize-none"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Minimum 10 characters</span>
                    <span>{bio.length}/600</span>
                  </div>
                </div>

                {/* Language */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Primary Language</label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Country / Region</label>
                    <Input
                      placeholder="e.g. United States"
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="h-11"
                      maxLength={60}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 1: Professional ── */}
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">Professional overview</h1>
                <p className="text-muted-foreground mt-1">Showcase your expertise so buyers know you're the right fit.</p>
              </div>

              <Card className="p-8 shadow-card space-y-6">
                {/* Occupation */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Occupation <span className="text-destructive">*</span>
                  </label>
                  <Select value={occupation} onValueChange={setOccupation}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select your primary role" /></SelectTrigger>
                    <SelectContent>
                      {OCCUPATIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                {/* Skills */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Skills <span className="text-destructive">*</span>
                    <span className="text-muted-foreground text-xs font-normal ml-1">(Add up to 15)</span>
                  </label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      className="h-10"
                      maxLength={40}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 px-3"
                      onClick={() => addSkill(skillInput)}
                      disabled={!skillInput.trim() || skills.length >= 15}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Active skill chips */}
                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="gap-1.5 text-sm pl-3 pr-2 py-1 font-normal">
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Popular skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SKILL_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 12).map(s => (
                        <button
                          key={s}
                          onClick={() => addSkill(s)}
                          disabled={skills.length >= 15}
                          className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Years of Experience <span className="text-muted-foreground text-xs font-normal">(optional)</span>
                  </label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger className="h-11"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      {["Less than 1 year", "1–2 years", "3–5 years", "6–10 years", "10+ years"].map(e => (
                        <SelectItem key={e} value={e}>{e}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 2: Linked Accounts ── */}
          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">Linked accounts</h1>
                <p className="text-muted-foreground mt-1">Build trust by connecting your professional profiles. All links are optional.</p>
              </div>

              <Card className="p-8 shadow-card space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" /> Personal Website
                  </label>
                  <Input
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                    className="h-11"
                    maxLength={200}
                    type="url"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-muted-foreground" /> LinkedIn Profile
                  </label>
                  <Input
                    placeholder="https://linkedin.com/in/yourname"
                    value={linkedin}
                    onChange={e => setLinkedin(e.target.value)}
                    className="h-11"
                    maxLength={200}
                    type="url"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" /> GitHub Profile
                  </label>
                  <Input
                    placeholder="https://github.com/yourusername"
                    value={github}
                    onChange={e => setGithub(e.target.value)}
                    className="h-11"
                    maxLength={200}
                    type="url"
                  />
                </div>

                <div className="rounded-xl bg-muted/40 border border-border p-4 text-sm text-muted-foreground">
                  These links will be displayed on your seller profile to help buyers verify your background and expertise.
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 3: Account Security / Summary ── */}
          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit">
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold text-foreground">Account security</h1>
                <p className="text-muted-foreground mt-1">Review your info and confirm to activate your seller account.</p>
              </div>

              <Card className="p-8 shadow-card space-y-5">
                {/* Summary tiles */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Name</div>
                    <div className="font-semibold text-foreground">{fullName}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Occupation</div>
                    <div className="font-semibold text-foreground">{occupation || "—"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Country</div>
                    <div className="font-semibold text-foreground">{country || "—"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Language</div>
                    <div className="font-semibold text-foreground">{language}</div>
                  </div>
                </div>

                {skills.length > 0 && (
                  <div className="p-4 rounded-xl bg-secondary/50">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-xl bg-secondary/50">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">About You</div>
                  <div className="text-sm text-foreground line-clamp-3">{bio}</div>
                </div>

                {/* Security info */}
                <div className="rounded-xl bg-primary/5 border border-primary/20 p-5">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Seller account activation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        By clicking "Activate Seller Account", you agree to our{" "}
                        <Link to="#" className="text-primary hover:underline">Seller Terms of Service</Link>{" "}
                        and confirm all information is accurate. Your account will be reviewed within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email verified indicator */}
                <div className="flex items-center gap-3 p-4 rounded-xl border border-success/30 bg-success/5">
                  <CheckCircle className="h-5 w-5 text-success shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Email verified</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 font-semibold"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting || uploading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8 font-semibold"
            >
              {submitting ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Activating…</>
              ) : (
                <><CheckCircle className="h-4 w-4" /> Activate Seller Account</>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerSetupPage;

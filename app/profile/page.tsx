import { redirect } from "next/navigation"

// The former /profile route showed a fake social-media mockup with
// fabricated stats. It has no real content of its own — About covers the
// same personal/professional identity with real data.
export default function ProfilePage() {
    redirect("/about")
}

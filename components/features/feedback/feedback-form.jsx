"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"
import { toast } from "react-hot-toast"

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.target)
      const response = await fetch("https://formspree.io/f/manelqvd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        toast.success("Geri bildiriminiz için teşekkürler!")
        e.target.reset()
        setIsOpen(false)
      } else {
        throw new Error("Gönderme hatası")
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error)
      toast.error("Geri bildirim gönderilirken bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Geri Bildirim
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Geri Bildirim Gönder</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Textarea
              name="message"
              placeholder="Görüşlerinizi, önerilerinizi veya hata bildirimlerinizi buraya yazabilirsiniz..."
              className="min-h-[120px] resize-none"
              required
            />
            <input
              type="email"
              name="_replyto"
              placeholder="Email adresiniz (isteğe bağlı)"
              className="w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                "Gönder"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 
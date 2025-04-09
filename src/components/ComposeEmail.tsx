
import { useEmail } from '@/contexts/EmailContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

const ComposeEmail = () => {
  const { composeOpen, closeCompose, sendEmail } = useEmail();
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleSend = () => {
    if (!to) {
      toast.error('Please specify at least one recipient');
      return;
    }

    sendEmail({
      to: to.split(',').map(email => email.trim()),
      subject,
      body,
    });

    toast.success('Email sent successfully');
    resetForm();
    closeCompose();
  };

  const resetForm = () => {
    setTo('');
    setSubject('');
    setBody('');
  };

  const handleClose = () => {
    closeCompose();
    resetForm();
  };

  return (
    <Dialog open={composeOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose Email</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <div className="flex items-center border-b pb-2">
              <span className="w-16 text-gray-500 text-sm">To:</span>
              <Input
                type="text"
                placeholder="Recipients"
                className="border-none shadow-none focus-visible:ring-0"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="flex items-center border-b pb-2">
              <span className="w-16 text-gray-500 text-sm">Subject:</span>
              <Input
                type="text"
                placeholder="Subject"
                className="border-none shadow-none focus-visible:ring-0"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <Textarea
            className="min-h-[200px] resize-none border-none shadow-none focus-visible:ring-0"
            placeholder="Write your message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="flex justify-between">
            <Button 
              type="submit" 
              className="bg-gmail-blue hover:bg-blue-600"
              onClick={handleSend}
            >
              Send
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Discard
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeEmail;

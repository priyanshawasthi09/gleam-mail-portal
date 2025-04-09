
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Email, mockEmails, EmailFolder, mockFolders } from '@/lib/mockData';
import { toast } from 'sonner';

interface EmailContextProps {
  emails: Email[];
  folders: EmailFolder[];
  currentFolder: string;
  selectedEmail: Email | null;
  composeOpen: boolean;
  setCurrentFolder: (folder: string) => void;
  selectEmail: (email: Email | null) => void;
  markAsRead: (emailId: string) => void;
  toggleStarred: (emailId: string) => void;
  openCompose: () => void;
  closeCompose: () => void;
  deleteEmail: (emailId: string) => void;
  sendEmail: (email: Partial<Email>) => void;
  currentUserEmail: string; // Add current user email
}

const EmailContext = createContext<EmailContextProps | undefined>(undefined);

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [emails, setEmails] = useState<Email[]>(mockEmails);
  const [folders] = useState<EmailFolder[]>(mockFolders);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  // Current user email - in a real app this would come from auth
  const currentUserEmail = 'demo@example.com';

  const selectEmail = (email: Email | null) => {
    setSelectedEmail(email);
    if (email && !email.isRead) {
      markAsRead(email.id);
    }
  };

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isRead: true } : email
    ));
  };

  const toggleStarred = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, isStarred: !email.isStarred } : email
    ));
  };

  const openCompose = () => setComposeOpen(true);
  const closeCompose = () => setComposeOpen(false);

  const deleteEmail = (emailId: string) => {
    setEmails(emails.filter(email => email.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const sendEmail = (email: Partial<Email>) => {
    const newEmail: Email = {
      id: `email-${Date.now()}`,
      from: {
        name: 'Me',
        email: currentUserEmail,
      },
      to: email.to || [],
      subject: email.subject || '(no subject)',
      body: email.body || '',
      isRead: true,
      isStarred: false,
      labels: [],
      attachments: [],
      timestamp: new Date(),
    };
    
    setEmails([newEmail, ...emails]);
    closeCompose();
  };

  return (
    <EmailContext.Provider
      value={{
        emails,
        folders,
        currentFolder,
        selectedEmail,
        composeOpen,
        currentUserEmail,
        setCurrentFolder,
        selectEmail,
        markAsRead,
        toggleStarred,
        openCompose,
        closeCompose,
        deleteEmail,
        sendEmail,
      }}
    >
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (context === undefined) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};

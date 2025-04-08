
import { formatDistanceToNow } from 'date-fns';

export interface Email {
  id: string;
  from: {
    name: string;
    email: string;
  };
  to: string[];
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  labels: string[];
  attachments: string[];
  timestamp: Date;
}

export interface EmailFolder {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

// Generate random dates within the last 30 days
const getRandomDate = () => {
  const randomDays = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - randomDays);
  return date;
};

export const generateMockEmails = (count: number = 20): Email[] => {
  const labels = ['work', 'personal', 'social', 'updates', 'promotions'];
  const domains = ['gmail.com', 'outlook.com', 'company.com', 'example.org', 'mail.co'];
  const subjects = [
    'Meeting Tomorrow',
    'Your Order Confirmation',
    'Weekly Newsletter',
    'Important: Account Update',
    'Invitation to Event',
    'Your Receipt',
    'Follow-up on Our Conversation',
    'Welcome to Our Platform',
    'Your Subscription Renewal',
    'Action Required: Verify Your Account'
  ];
  
  const firstNames = ['Alex', 'Jamie', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Quinn', 'Avery', 'Peyton'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
  
  const emails: Email[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const emailAddress = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
    const labelSet = new Set<string>();
    
    // Assign 1-2 random labels
    const numLabels = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < numLabels; j++) {
      labelSet.add(labels[Math.floor(Math.random() * labels.length)]);
    }
    
    const timestamp = getRandomDate();
    
    emails.push({
      id: `email-${i + 1}`,
      from: {
        name: `${firstName} ${lastName}`,
        email: emailAddress
      },
      to: ['demo@example.com'],
      subject: subjects[Math.floor(Math.random() * subjects.length)],
      body: `This is a sample email body for email #${i + 1}. It's a placeholder for actual content.
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc eget nisl.
      
      Best regards,
      ${firstName}`,
      isRead: Math.random() > 0.6,
      isStarred: Math.random() > 0.8,
      labels: Array.from(labelSet),
      attachments: [],
      timestamp
    });
  }
  
  // Sort by timestamp (newest first)
  return emails.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export const formatEmailDate = (date: Date): string => {
  const now = new Date();
  const isToday = date.getDate() === now.getDate() && 
                 date.getMonth() === now.getMonth() && 
                 date.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  const isThisYear = date.getFullYear() === now.getFullYear();
  if (isThisYear) {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  
  return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
};

export const mockFolders: EmailFolder[] = [
  { id: 'inbox', name: 'Inbox', icon: 'inbox', count: 12 },
  { id: 'starred', name: 'Starred', icon: 'star', count: 3 },
  { id: 'sent', name: 'Sent', icon: 'send' },
  { id: 'drafts', name: 'Drafts', icon: 'edit', count: 2 },
  { id: 'spam', name: 'Spam', icon: 'alert-triangle', count: 5 },
  { id: 'trash', name: 'Trash', icon: 'trash-2' }
];

// Generate our initial mock data
export const mockEmails = generateMockEmails(30);

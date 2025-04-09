
import { useEmail } from "@/contexts/EmailContext";
import { formatEmailDate } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const EmailList = () => {
  const { 
    emails, 
    currentFolder, 
    selectEmail, 
    selectedEmail, 
    toggleStarred,
    currentUserEmail
  } = useEmail();

  // Filter emails based on current folder and user
  const filteredEmails = emails.filter(email => {
    const isSender = email.from.email === currentUserEmail;
    const isRecipient = email.to.includes(currentUserEmail);

    switch (currentFolder) {
      case 'inbox':
        // In inbox, show only emails received by current user
        return isRecipient && !isSender;
      case 'sent':
        // In sent, show only emails sent by current user
        return isSender;
      case 'starred':
        // In starred, show starred emails relevant to the user
        return email.isStarred && (isRecipient || isSender);
      case 'drafts':
        return false; // No drafts for this demo
      case 'spam':
        return false; // No spam for this demo
      case 'trash':
        return false; // No deleted emails for this demo
      default:
        return true;
    }
  });

  return (
    <div className="flex-1 overflow-auto bg-white border-r border-gray-200">
      {filteredEmails.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          No emails in this folder
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              className={cn(
                "relative hover:bg-gray-50 cursor-pointer transition-colors",
                selectedEmail?.id === email.id && "bg-blue-50",
                !email.isRead && "bg-blue-50/30"
              )}
              onClick={() => selectEmail(email)}
            >
              <div className="flex items-center p-4">
                <div className="flex items-center w-12">
                  <Checkbox 
                    className="mr-2"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStarred(email.id);
                    }}
                    className="text-gray-400 hover:text-yellow-400"
                  >
                    <StarIcon 
                      className={cn(
                        "h-4 w-4",
                        email.isStarred && "fill-yellow-400 text-yellow-400"
                      )} 
                    />
                  </button>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className={cn(
                      "text-sm truncate",
                      !email.isRead && "font-semibold"
                    )}>
                      {currentFolder === 'sent' ? 'To: ' + email.to.join(', ') : email.from.name}
                    </p>
                    <p className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {formatEmailDate(email.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm truncate">{email.subject}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {email.body.split('\n')[0]}
                  </p>
                  {email.labels.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {email.labels.map((label) => (
                        <Badge 
                          key={label} 
                          variant="outline" 
                          className="text-xs py-0 h-5"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmailList;

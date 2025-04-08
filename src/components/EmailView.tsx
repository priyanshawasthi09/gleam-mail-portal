
import { useEmail } from "@/contexts/EmailContext";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeftIcon, StarIcon, TrashIcon, ArchiveIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const EmailView = () => {
  const { selectedEmail, selectEmail, toggleStarred, deleteEmail } = useEmail();

  if (!selectedEmail) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
        <div className="text-center">
          <MailIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium">Select an email to view</h3>
          <p className="mt-1">No email selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="border-b p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => selectEmail(null)}
            className="mr-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => toggleStarred(selectedEmail.id)}
            >
              <StarIcon 
                className={`h-4 w-4 ${selectedEmail.isStarred ? "fill-yellow-400 text-yellow-400" : ""}`} 
              />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => deleteEmail(selectedEmail.id)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ArchiveIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <h1 className="text-xl font-semibold mb-4">{selectedEmail.subject}</h1>
        
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-4">
            <div className="bg-gmail-blue text-white rounded-full w-full h-full flex items-center justify-center text-sm font-medium">
              {selectedEmail.from.name.charAt(0)}
            </div>
          </Avatar>
          
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between mb-1">
              <div className="font-medium">{selectedEmail.from.name}</div>
              <div className="text-sm text-gray-500">
                {formatDistanceToNow(selectedEmail.timestamp, { addSuffix: true })}
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mb-1">
              To: {selectedEmail.to.join(", ")}
            </div>
            
            {selectedEmail.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedEmail.labels.map(label => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="prose prose-sm max-w-none">
          {selectedEmail.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {selectedEmail.attachments.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Attachments ({selectedEmail.attachments.length})</h3>
            <div className="flex flex-wrap gap-2">
              {selectedEmail.attachments.map((attachment, index) => (
                <div key={index} className="border rounded p-2 text-sm">
                  {attachment}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailView;

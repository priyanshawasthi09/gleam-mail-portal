
import { Button } from "@/components/ui/button";
import { useEmail } from "@/contexts/EmailContext";
import { cn } from "@/lib/utils";
import { PenIcon, InboxIcon, StarIcon, SendIcon, FileEditIcon, AlertTriangleIcon, Trash2Icon } from "lucide-react";

const EmailSidebar = () => {
  const { folders, currentFolder, setCurrentFolder, openCompose } = useEmail();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'inbox':
        return <InboxIcon className="h-4 w-4" />;
      case 'star':
        return <StarIcon className="h-4 w-4" />;
      case 'send':
        return <SendIcon className="h-4 w-4" />;
      case 'edit':
        return <FileEditIcon className="h-4 w-4" />;
      case 'alert-triangle':
        return <AlertTriangleIcon className="h-4 w-4" />;
      case 'trash-2':
        return <Trash2Icon className="h-4 w-4" />;
      default:
        return <InboxIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-64 border-r border-gray-200 h-full flex flex-col overflow-y-auto bg-white">
      <div className="p-4">
        <Button 
          onClick={openCompose}
          className="w-full gap-2 bg-gmail-blue hover:bg-blue-600 text-white"
        >
          <PenIcon className="h-4 w-4" />
          Compose
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1 px-2">
          {folders.map((folder) => (
            <li key={folder.id}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 text-left font-normal",
                  currentFolder === folder.id && "bg-blue-50 text-gmail-blue font-medium"
                )}
                onClick={() => setCurrentFolder(folder.id)}
              >
                {getIcon(folder.icon)}
                <span>{folder.name}</span>
                {folder.count !== undefined && folder.count > 0 && (
                  <span className="ml-auto text-xs font-medium text-gray-500">{folder.count}</span>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default EmailSidebar;

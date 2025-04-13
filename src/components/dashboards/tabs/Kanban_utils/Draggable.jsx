// Draggable Component
export function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
      id: props.id || 'draggable',
    });
  
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  
    const style = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition: 'transform 0.2s ease, opacity 0.2s ease',
      position: 'relative',
      opacity: isDragging ? 0.65 : 1,
      zIndex: isDragging ? 10 : 1,
    };
  
    const {
      title = 'Task Title',
      description = '',
      assignedTo = 'Unassigned',
      deadline = 'No deadline',
      attachment = null,
      status,
      pendingReason = '',
      pendingProof = null,
    } = props.task || {};
  
    const hasExtraDetails = description || attachment || pendingReason || pendingProof;
    const isImageAttachment = attachment && attachment.name && /\.(jpg|jpeg|png|gif)$/i.test(attachment.name);
    const isImageProof = pendingProof && pendingProof.name && /\.(jpg|jpeg|png|gif)$/i.test(pendingProof.name);
  
    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="w-full">
        <Card className="w-full cursor-move hover:shadow-lg rounded-lg overflow-hidden border-0 shadow-sm transition-all duration-300">
          <CardBody className="p-4 bg-white">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="text-gray-900 font-semibold truncate flex-1">
                {title}
              </Typography>
              {hasExtraDetails && (
                <IconButton
                  variant="text"
                  size="sm"
                  className="text-indigo-600 hover:text-indigo-800"
                  onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                >
                  <Eye className="h-5 w-5" />
                </IconButton>
              )}
            </div>
  
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Typography variant="small" className="font-medium text-gray-700">Assigned:</Typography>
                <Chip size="sm" value={assignedTo} className="bg-indigo-500 text-white rounded-full px-2 py-0.5 text-xs" />
              </div>
              <div className="flex items-center gap-2">
                <Typography variant="small" className="font-medium text-gray-700">Due:</Typography>
                <Typography
                  variant="small"
                  className={`font-medium ${new Date(deadline) < new Date() && deadline !== 'No deadline' ? 'text-red-600' : 'text-gray-600'}`}
                >
                  {deadline}
                </Typography>
              </div>
            </div>
  
            {hasExtraDetails && isAccordionOpen && (
              <div className="mt-4 space-y-3">
                {description && (
                  <Typography variant="small" className="text-gray-600 line-clamp-3">
                    {description}
                  </Typography>
                )}
  
                {attachment && (
                  <div>
                    {isImageAttachment ? (
                      <img
                        src={attachment.url || `https://via.placeholder.com/150?text=${attachment.name}`}
                        alt={attachment.name}
                        className="w-full h-32 object-cover rounded-md border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                        <IconButton variant="text" size="sm" className="rounded-full">
                          <Paperclip className="h-4 w-4 text-indigo-500" />
                        </IconButton>
                        <Typography variant="small" className="text-gray-600 truncate">{attachment.name}</Typography>
                      </div>
                    )}
                  </div>
                )}
  
                {pendingReason && (
                  <div className="bg-orange-50 p-2 rounded-md">
                    <Typography variant="small" className="font-medium text-orange-800 mb-1">Pending Reason:</Typography>
                    <Typography variant="small" className="text-gray-700">{pendingReason}</Typography>
                    {pendingProof && (
                      <div className="mt-2">
                        {isImageProof ? (
                          <img
                            src={pendingProof.url || `https://via.placeholder.com/150?text=${pendingProof.name}`}
                            alt={pendingProof.name}
                            className="w-full h-32 object-cover rounded-md border border-gray-100 shadow-sm hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                            <IconButton variant="text" size="sm" className="rounded-full">
                              <Paperclip className="h-4 w-4 text-orange-500" />
                            </IconButton>
                            <Typography variant="small" className="text-gray-600 truncate">{pendingProof.name}</Typography>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardBody>
  
          <CardFooter className="p-2 bg-gray-50 border-t border-gray-100 text-center">
            <Typography variant="small" className="text-gray-500 italic text-xs">
              {hasExtraDetails ? 'Click eye for details · Drag to move' : 'Drag to move'}
            </Typography>
          </CardFooter>
        </Card>
      </div>
    );
  }
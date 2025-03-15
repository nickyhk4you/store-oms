import ChannelActions from '../components/channels/ChannelActions';

// Then in the table row where the actions are rendered:
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
  <ChannelActions 
    channel={channel} 
    onUpdate={() => {
      // In a real app, you would refresh the data
      console.log('Channel updated');
      // Optionally refresh the data
      // setChannels([...channels]);
    }} 
  />
</td> 
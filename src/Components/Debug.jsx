import { useData } from '../context/context';

const Debug = () => {
  const { data, loading, error } = useData();
  
  return (
    <div className="fixed bottom-4 left-4 p-4 bg-black/80 text-white rounded-lg text-xs">
      <pre>
        {JSON.stringify({ loading, error, hasData: !!data, contact: !!data?.contact }, null, 2)}
      </pre>
    </div>
  );
};

export default Debug; 
interface CatFormProps {
    onAdd: (name: string, color: string) => void;
  }
  
  export default function CatForm({ onAdd }: CatFormProps) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onAdd(name, color);
      setName("");
      setColor("");
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex gap-4 mt-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border p-2 flex-1"
        />
        <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded">
          Add
        </button>
      </form>
    );
  }  
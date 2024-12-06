interface Cat {
    id: number;
    name: string;
    color: string;
    onDelete: (id: number) => void;
  }
  
  export default function CatCard({ id, name, color, onDelete }: Cat) {
    return (
      <div className="border p-4 rounded shadow-lg flex flex-col items-center">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-600">Color: {color}</p>
        <button
          onClick={() => onDelete(id)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete
        </button>
      </div>
    );
  }  
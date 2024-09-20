import React from 'react';

const EditModal = ({ item, onClose, onSave, onDelete, onChange }) => {
  if (!item) return null;  // If no item selected, don't show modal

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={item.description}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={item.price}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600"
            onClick={onSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PeopleDB() {
  const [people, setPeople] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', middleName: '', lastName: '', gender: '', age: '', phone: '',
    home: { house: '', street: '', area: '', city: '' },
    work: { house: '', street: '', area: '', city: '' },
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e, section, field) => {
    if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: e.target.value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...people];
      updated[editIndex] = formData;
      setPeople(updated);
    } else {
      setPeople([...people, formData]);
    }
    setFormData({
      firstName: '', middleName: '', lastName: '', gender: '', age: '', phone: '',
      home: { house: '', street: '', area: '', city: '' },
      work: { house: '', street: '', area: '', city: '' },
    });
    setEditIndex(null);
    setShowDialog(false);
  };

  const handleEdit = (index) => {
    setFormData(people[index]);
    setEditIndex(index);
    setShowDialog(true);
  };

  const handleDelete = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const formatAddress = (addr) => `${addr.house}, ${addr.street}, ${addr.area}, ${addr.city}`;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-2 flex justify-between items-center">
        <img src="/logo.png" className="h-8 w-8 rounded-full" alt="Logo" />
        <h1 className="text-lg font-semibold">People DB</h1>
        <div className="w-8" />
      </header>

      <main className="flex flex-col items-center py-10">
        <h2 className="text-2xl mb-4">Welcome to People DB!</h2>
        <div className="space-x-2">
          <Button onClick={() => setShowDialog(true)}>Add</Button>
        </div>

        <div className="w-full max-w-6xl mt-10 overflow-x-auto">
          {people.length > 0 && (
            <table className="table-auto w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Gender</th>
                  <th className="p-2">Age</th>
                  <th className="p-2">Phone</th>
                  <th className="p-2">Home Address</th>
                  <th className="p-2">Work Address</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{person.firstName} {person.middleName} {person.lastName}</td>
                    <td className="p-2">{person.gender}</td>
                    <td className="p-2">{person.age}</td>
                    <td className="p-2">{person.phone}</td>
                    <td className="p-2">
                      <div className="relative group max-w-xs cursor-pointer">
                        <div className="truncate w-48">{formatAddress(person.home)}</div>
                        <div className="absolute bg-white border p-2 rounded shadow hidden group-hover:block z-50 whitespace-pre">
                          {formatAddress(person.home)}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="relative group max-w-xs cursor-pointer">
                        <div className="truncate w-48">{formatAddress(person.work)}</div>
                        <div className="absolute bg-white border p-2 rounded shadow hidden group-hover:block z-50 whitespace-pre">
                          {formatAddress(person.work)}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 space-x-2">
                      <Button size="sm" onClick={() => handleEdit(idx)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl max-h-[90%] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              <Input name="middleName" placeholder="Middle Name" value={formData.middleName} onChange={handleChange} />
              <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              <select
                className="border rounded p-2"
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              >
                <option value="">Gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <Input name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>

            <h3 className="text-lg font-semibold mb-2">Home Address</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Input placeholder="House No" value={formData.home.house} onChange={(e) => handleChange(e, 'home', 'house')} />
              <Input placeholder="Street" value={formData.home.street} onChange={(e) => handleChange(e, 'home', 'street')} />
              <Input placeholder="Area" value={formData.home.area} onChange={(e) => handleChange(e, 'home', 'area')} />
              <Input placeholder="City" value={formData.home.city} onChange={(e) => handleChange(e, 'home', 'city')} />
            </div>

            <h3 className="text-lg font-semibold mb-2">Work Address</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Input placeholder="House No" value={formData.work.house} onChange={(e) => handleChange(e, 'work', 'house')} />
              <Input placeholder="Street" value={formData.work.street} onChange={(e) => handleChange(e, 'work', 'street')} />
              <Input placeholder="Area" value={formData.work.area} onChange={(e) => handleChange(e, 'work', 'area')} />
              <Input placeholder="City" value={formData.work.city} onChange={(e) => handleChange(e, 'work', 'city')} />
            </div>

            <div className="text-right space-x-2">
              <Button onClick={() => setShowDialog(false)} variant="outline">Cancel</Button>
              <Button onClick={handleSave}>{editIndex !== null ? 'Update' : 'Save'}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

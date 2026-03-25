import PageForm from '../PageForm';

export const metadata = { title: 'New Page' };

export default function NewPagePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Page</h1>
      <PageForm />
    </div>
  );
}

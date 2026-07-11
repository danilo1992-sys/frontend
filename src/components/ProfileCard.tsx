import { $userStore, $sessionStore, $clerkStore } from '@clerk/astro/client';
import { useStore } from '@nanostores/react';

export default function ProfileCard() {
    const user = useStore($userStore);
    const session = useStore($sessionStore);

    if (!user || !session) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p style={{ color: 'var(--spotify-gray)' }}>Cargando perfil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--spotify-green)' }}>
                Mi Perfil
            </h1>

            <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--spotify-dark)' }}>
                <div className="flex items-center gap-6 mb-6">
                    {user.imageUrl ? (
                        <img 
                            src={user.imageUrl} 
                            alt="Avatar" 
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    ) : (
                        <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold"
                            style={{ backgroundColor: 'var(--spotify-green)', color: 'black' }}
                        >
                            {user.firstName?.charAt(0) || user.emailAddresses?.[0]?.emailAddress?.charAt(0) || '?'}
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p style={{ color: 'var(--spotify-gray)' }}>
                            {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                    </div>
                </div>

                <div className="border-t pt-4" style={{ borderColor: 'var(--spotify-light-gray)' }}>
                    <p className="text-sm" style={{ color: 'var(--spotify-gray)' }}>
                        Miembro desde: {user.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                </div>

                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => {
                            const clerk = $clerkStore.get();
                            clerk?.signOut().then(() => {
                                window.location.href = '/';
                            });
                        }}
                        className="py-2 px-6 rounded-full font-bold cursor-pointer transition-all hover:scale-105"
                        style={{ backgroundColor: 'var(--spotify-green)', color: 'black' }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegister, apiLogin } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [cc, setCc] = useState<string>("");
  const [urlPhoto, setUrlPhoto] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRegister({
        name,
        email,
        password,
        phone: phone || null,
        cc: cc || null,
        url_photo: urlPhoto || null,
      });
      toast({ title: "Registro exitoso", description: "Cuenta creada" });
      // opcional: iniciar sesión automático
      const data = await apiLogin({ email, password });
      localStorage.setItem("token", data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Error de registro", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Marficient - Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Nombre</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1">Teléfono (opcional)</label>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1">CC (opcional)</label>
              <Input value={cc} onChange={(e) => setCc(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1">URL Foto (opcional)</label>
              <Input type="url" value={urlPhoto} onChange={(e) => setUrlPhoto(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creando..." : "Crear cuenta"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

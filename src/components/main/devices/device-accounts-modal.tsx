"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import {
  ChevronDown,
  ChevronRight,
  Mail,
  Plus,
  SquarePen,
  Trash2,
} from "lucide-react";
import { SocialAccountFormModal } from "./SocialAccountFormModal";
import {
  deleteDeviceAccount,
  deleteSocialNetworkAccount,
  getAccountsAndSocialMedia,
} from "@/app/main/devices/api";
import { toast } from "sonner";
import {
  AccountsAndSocialMedia,
  DeviceAccountsModalProps,
  SocialNetworkAccount,
} from "@/app/main/devices/types";
import { AddAccountForm } from "./AddAccountForm";

export function DeviceAccountsModal({
  children,
  deviceId,
  deviceName,
}: DeviceAccountsModalProps) {
  // const [accountId, setAccountId] = useState<number | null>(null);
  // const [showSocialAccountForm, setShowSocialAccountForm] = useState(false);
  const [socialAccountToEdit, setSocialAccountToEdit] =
    useState<SocialNetworkAccount | null>(null);

  const [showAccountForm, setShowAccountForm] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<{
    id: number;
    email: string;
  } | null>(null);

  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState<AccountsAndSocialMedia[]>([]);
  const [expandedAccounts, setExpandedAccounts] = useState<Set<number>>(
    new Set()
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open, deviceId]);

  // Obtener los datos del servidor
  const fetchData = async () => {
    setLoading(true);

    //Obtener cuenta google del dispositivo
    const res = await getAccountsAndSocialMedia(deviceId);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    setAccounts(res.data);

    setLoading(false);
  };

  console.log("google accounts:", accounts);

  const toggleAccountExpansion = (accountId: number) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const handleAddSocialAccount = () => {
    // setAccountId(accountId);
    // setShowSocialAccountForm(true);
    setSocialAccountToEdit(null);
  };

  const handleEditSocialAccount = (socialAccount: SocialNetworkAccount) => {
    setSocialAccountToEdit(socialAccount);
    // setShowSocialAccountForm(true);
  };

  const handleSaveSocialAccount = () => {
    // Ocultar el modal
    setSocialAccountToEdit(null);
  };

  const handleDeleteSocialAccount = async (socialAccountId: number) => {
    const res = await deleteSocialNetworkAccount(socialAccountId);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    // Actualizar datos del servidor
    await fetchData();

    toast.success("Cuenta de red social eliminada correctamente");
  };

  const handleAddAccount = () => {
    setShowAccountForm(true); // Mostramos el formulacio de adición
    setAccountToEdit(null); // Limpiar el formulario
  };

  const handleEditAccount = (account: { id: number; email: string }) => {
    setAccountToEdit(account);
    setShowAccountForm(true); // Mostramos el formulacio de adición
  };

  const handleDeleteAccount = async (accountId: number) => {
    const res = await deleteDeviceAccount(accountId);

    if (!res.ok) {
      toast.error(res.message);
      return;
    }

    // Actualizar datos del servidor
    await fetchData();

    toast.success("Correo eliminado correctamente");
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Información del Dispositivo</DialogTitle>
            <DialogDescription>
              {deviceName} - Cuentas registradas y redes sociales asociadas
            </DialogDescription>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Cuentas de Google</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddAccount}
                  className="cursor-pointer"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar Correo
                </Button>
              </div>

              {showAccountForm && (
                <AddAccountForm
                  setShowAddAccountForm={setShowAccountForm}
                  deviceId={deviceId}
                  fetchData={fetchData}
                  accountToEdit={accountToEdit || undefined}
                />
              )}

              {accounts.length === 0 ? (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">
                      No hay cuentas registradas para este dispositivo
                    </p>
                  </CardContent>
                </Card>
              ) : (
                accounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <CardTitle className="text-base">
                            {account.email}
                          </CardTitle>
                          <Badge variant="secondary">
                            {account.social_network_accounts.length} redes
                            sociales
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleEditAccount({
                                id: account.id,
                                email: account.email,
                              })
                            }
                            className="cursor-pointer"
                          >
                            <SquarePen className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteAccount(account.id)}
                            className="cursor-pointer text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleAccountExpansion(account.id)}
                            className="cursor-pointer"
                          >
                            {expandedAccounts.has(account.id) ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    {expandedAccounts.has(account.id) && (
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">
                              Redes Sociales
                            </h4>

                            <SocialAccountFormModal
                              fetchData={fetchData}
                              accountId={account.id}
                              trigger={
                                <Button variant="outline" size="sm">
                                  <Plus className="h-4 w-4 mr-1" />
                                  Agregar Red Social
                                </Button>
                              }
                            />
                          </div>

                          {account.social_network_accounts.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                              No hay redes sociales registradas
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {account.social_network_accounts.map(
                                (socialAccount) => (
                                  <div
                                    key={socialAccount.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                          {socialAccount.social_network.name.toLowerCase()}
                                        </Badge>
                                        <span className="text-sm font-medium">
                                          {socialAccount.username}
                                        </span>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        Password:{" "}
                                        {socialAccount.password
                                          ? "Configurado"
                                          : "No configurado"}
                                      </p>
                                    </div>
                                    <div className="flex gap-2">
                                      <SocialAccountFormModal
                                        fetchData={fetchData}
                                        socialAccountToEdit={socialAccount}
                                        trigger={
                                          <Button variant="ghost" size="sm">
                                            Editar
                                          </Button>
                                        }
                                      />

                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleDeleteSocialAccount(
                                            socialAccount.id
                                          )
                                        }
                                        className="text-destructive hover:text-destructive"
                                      >
                                        Eliminar
                                      </Button>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

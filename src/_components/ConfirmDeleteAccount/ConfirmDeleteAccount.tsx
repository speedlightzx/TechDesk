import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";

export function ConfirmDeleteAccount(
    { openDialog, setOpenDialog, deleteMyAccount }: 
    { openDialog: boolean, setOpenDialog: Dispatch<SetStateAction<boolean>>, deleteMyAccount: () => Promise<void> }
) {
    return (
    <AlertDialog open={openDialog}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Você tem certeza que deseja apagar sua conta <strong>permanentemente</strong>?
                    </AlertDialogDescription>
            </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpenDialog(false)}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-800 hover:text-white" asChild>
                        <Button onClick={() => deleteMyAccount()} variant="ghost">Deletar</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
    )
}
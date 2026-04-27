import { Request, Response } from "express";
import { Contact } from "../models/Contact";
import { createContactSchema } from "../validations/createContactSchema";
import { updateContactSchema } from "../validations/updateContactSchema";
/**
 * GET ALL CONTACTS
 */
export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find();

    return res.status(200).json({
      success: true,
      message: "Liste des contacts",
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des contacts",
    });
  }
};

/**
 * CREATE CONTACT
 */
export const createContact = async (req: Request, res: Response) => {
  // validation Zod
  const validation = createContactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Erreur de validation",
      errors: validation.error.issues,
    });
  }

  const data = validation.data;

  try {
    // vérifier email
    const emailExists = await Contact.findOne({ email: data.email });

    if (emailExists) {
      return res.status(409).json({
        message: "Cet email est déjà utilisé",
      });
    }

    // vérifier phone (CORRIGÉ)
    const phoneExists = await Contact.findOne({ phone: data.phone });

    if (phoneExists) {
      return res.status(409).json({
        message: "Ce numéro est déjà utilisé",
      });
    }

    const contact = await Contact.create(data);

    return res.status(201).json({
      message: "Contact créé avec succès",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

/**
 * UPDATE CONTACT
 */
export const updateContact = async (req: Request, res: Response) => {
  const validation = updateContactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      message: "Erreur de validation",
      errors: validation.error.issues,
    });
  }

  const { id } = req.params;
  const data = validation.data;

  try {
    const contactExists = await Contact.findById(id);

    if (!contactExists) {
      return res.status(404).json({
        message: "Contact introuvable",
      });
    }

    // check email si changé
    if (data.email !== contactExists.email) {
      const emailExists = await Contact.findOne({ email: data.email });

      if (emailExists) {
        return res.status(409).json({
          message: "Cet email est déjà utilisé",
        });
      }
    }

    // check phone si changé
    if (data.phone !== contactExists.phone) {
      const phoneExists = await Contact.findOne({ phone: data.phone });

      if (phoneExists) {
        return res.status(409).json({
          message: "Ce numéro est déjà utilisé",
        });
      }
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({
      message: "Contact mis à jour avec succès",
      data: updatedContact,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

/**
 * DELETE CONTACT
 */
export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const contactExists = await Contact.findById(id);

    if (!contactExists) {
      return res.status(404).json({
        message: "Contact introuvable",
      });
    }

    await Contact.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Contact supprimé avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur",
    });
  }
};

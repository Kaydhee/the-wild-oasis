import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
	const { data, error } = await supabase.from('cabins').select('*');

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be loaded');
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// Creating a cabin/Editing a cabin
	let query = supabase.from('cabins');

	// A) Create
	if (!id) query.insert([{ ...newCabin, image: imagePath }]);

	// B) Edit
	if (id)
		query
			.update({ other_column: 'otherValue' })
			.eq('some_column', 'someValue')
			.select();

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be created');
	}

	// Uploading an image
	const { error: storageError } = await supabase.storage
		.from('cabin-images')
		.upload(imageName, newCabin.image);

	// automatically deleting an image if there was an error when uploading an image
	if (storageError) {
		await supabase.from('cabins').delete().eq('id', data.id);
		console.error(storageError);
		throw new Error(
			'Cabin image could not be uploaded and the cabin was not created'
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from('cabins').delete().eq('id', id);

	if (error) {
		console.error(error);
		throw new Error('Cabins could not be deleted');
	}

	return data;
}

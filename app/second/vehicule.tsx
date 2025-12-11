import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../composant/Footer";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FleetManagementApp = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, immatriculation: 'CE437HB', marque: 'Toyota', service: 'Taxi', statut: 'En Service', photo: null },
    { id: 2, immatriculation: 'CE437HB', marque: 'Toyota', service: 'Taxi', statut: 'En Service', photo: null },
    { id: 3, immatriculation: 'CE437HB', marque: 'Toyota', service: 'Taxi', statut: 'H. Service', photo: null }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    immatriculation: '',
    marque: '',
    service: '',
    statut: 'En Service',
    photo: null
  });

  const handleAddVehicle = () => {
    if (!newVehicle.immatriculation || !newVehicle.marque || !newVehicle.service) {
      Alert.alert('Champs manquants', 'Veuillez remplir la marque, le service et l\'immatriculation.');
      return;
    }
    setVehicles(prev => [...prev, { ...newVehicle, id: Date.now() }]);
    setNewVehicle({ immatriculation: '', marque: '', service: '', statut: 'En Service', photo: null });
    setShowAddForm(false);
  };

  const handlePhotoUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.didCancel) return;
      if (result.errorCode) {
        Alert.alert('Erreur', result.errorMessage || 'Impossible de sélectionner la photo.');
        return;
      }
      const asset = result.assets && result.assets[0];
      if (asset) setNewVehicle(prev => ({ ...prev, photo: asset.uri }));
    } catch (err) {
      console.warn('ImagePicker error:', err);
      Alert.alert('Erreur', 'Impossible de sélectionner la photo.');
    }
  };

  const handleDeleteVehicle = (id) => {
    Alert.alert(
      'Supprimer',
      'Voulez-vous vraiment supprimer ce véhicule ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => setVehicles(prev => prev.filter(v => v.id !== id)) }
      ]
    );
  };

  const filteredVehicles = vehicles.filter(v =>
    (v.immatriculation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.marque || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (v.service || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderVehicle = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.photoCell}>
        {item.photo ? (
          <Image source={{ uri: item.photo }} style={styles.vehicleImage} />
        ) : (
          <View style={styles.carIcon}>
            <Text style={styles.iconText}>🚗</Text>
          </View>
        )}
      </View>

      <View style={styles.infoCell}>
        <Text style={styles.immatriculation} numberOfLines={1} ellipsizeMode="tail">
          {item.immatriculation}
        </Text>
        <Text style={styles.meta} numberOfLines={1} ellipsizeMode="tail">
          {item.marque} • {item.service}
        </Text>
      </View>

      <View style={styles.statusCell}>
        <View style={[styles.badge, item.statut === 'En Service' ? styles.badgeActive : styles.badgeInactive]}>
          <Text style={styles.badgeText} numberOfLines={1} ellipsizeMode="tail">{item.statut}</Text>
        </View>
      </View>

      <View style={styles.actionsCell}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteVehicle(item.id)}>
          <Text style={styles.deleteText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* header / bouton à droite */}
        <View style={styles.container3}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddForm(prev => !prev)}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText} numberOfLines={1} ellipsizeMode="tail">
              {showAddForm ? "Retour" : "＋ Nouveau véhicule"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps="handled">
          <View style={styles.topSection}>
            <Text style={styles.pageTitle} numberOfLines={1} ellipsizeMode="tail">Mes Véhicules</Text>

            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  placeholder="Rechercher un véhicule..."
                  style={styles.searchInput}
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  returnKeyType="search"
                  numberOfLines={1}
                  allowFontScaling
                />
              </View>
            </View>
          </View>

          {showAddForm && (
            <View style={styles.addForm}>
              <Text style={styles.formTitle}>Nouveau véhicule</Text>

              <TouchableOpacity style={styles.photoUploadBox} activeOpacity={0.8} onPress={handlePhotoUpload}>
                {newVehicle.photo ? (
                  <Image source={{ uri: newVehicle.photo }} style={styles.uploadedImage} />
                ) : (
                  <View style={styles.uploadPlaceholder}>
                    <Text style={styles.uploadIcon}>🚘</Text>
                    <Text style={styles.uploadText}>Téléverser la photo du véhicule</Text>
                  </View>
                )}
              </TouchableOpacity>

              <View style={styles.formFieldsContainer}>
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Marque*</Text>
                  <TextInput
                    placeholder="Entrez la marque de votre véhicule"
                    style={styles.fieldInput}
                    value={newVehicle.marque}
                    onChangeText={(text) => setNewVehicle(prev => ({ ...prev, marque: text }))}
                    numberOfLines={1}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Service du véhicule*</Text>
                  <TextInput
                    placeholder="ex : taxi"
                    style={styles.fieldInput}
                    value={newVehicle.service}
                    onChangeText={(text) => setNewVehicle(prev => ({ ...prev, service: text }))}
                    numberOfLines={1}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Immatriculation*</Text>
                  <TextInput
                    placeholder="Numéro d'immatriculation"
                    style={styles.fieldInput}
                    value={newVehicle.immatriculation}
                    onChangeText={(text) => setNewVehicle(prev => ({ ...prev, immatriculation: text }))}
                    numberOfLines={1}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Type de véhicule</Text>
                  <TextInput
                    placeholder="voiture, camion..."
                    style={styles.fieldInput}
                    value={newVehicle.type || ''}
                    onChangeText={(text) => setNewVehicle(prev => ({ ...prev, type: text }))}
                    numberOfLines={1}
                  />
                </View>

                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Identifiant du dispositif de suivi</Text>
                  <TextInput
                    placeholder="ID du dispositif"
                    style={styles.fieldInput}
                    value={newVehicle.deviceId || ''}
                    onChangeText={(text) => setNewVehicle(prev => ({ ...prev, deviceId: text }))}
                    numberOfLines={1}
                  />
                </View>
              </View>

              <View style={styles.formActions}>
                <TouchableOpacity style={styles.submitButton} onPress={handleAddVehicle} activeOpacity={0.8}>
                  <Text style={styles.submitButtonText} numberOfLines={1} ellipsizeMode="tail">Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.listContainer}>
            {filteredVehicles.length > 0 ? (
              <FlatList
                data={filteredVehicles}
                renderItem={renderVehicle}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🚗</Text>
                <Text style={styles.emptyText}>Aucun véhicule trouvé</Text>
              </View>
            )}
          </View>
        </ScrollView>

        {/* FOOTER */}
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default FleetManagementApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },

  /* header right-aligned : paddingHorizontal faible pour petits écrans */
  container3: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 24,
    color: '#fff',
    marginRight: 8,
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },

  addButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    maxWidth: SCREEN_WIDTH * 0.6, // éviter débordement texte sur petits écrans
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  main: {
    padding: 16,
    paddingBottom: 40,
  },

  topSection: {
    marginBottom: 12,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },

  /* wrapper to control search width and allow reflow */
  searchWrapper: {
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    // taille flexible :
    minWidth: 0,
    width: '100%',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#6b7280'
  },
  searchInput: {
    flex: 1,
    minWidth: 0, // très important pour permettre au TextInput de shrink sur Android
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    fontSize: 16,
  },

  addForm: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },

  /* photo box responsive : aspectRatio et maxHeight pour empêcher overflow */
  photoUploadBox: {
    width: '100%',
    aspectRatio: 16 / 9, // garde proportions même si l'écran change
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0066ff',
    backgroundColor: '#fafbfc',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  uploadPlaceholder: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  uploadIcon: {
    fontSize: 36,
  },
  uploadText: {
    marginTop: 8,
    color: '#6b7280',
    textAlign: 'center',
  },

  formFieldsContainer: {
    marginTop: 6,
  },
  formField: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
  },
  fieldInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderRadius: 8,
    fontSize: 15,
  },
  formActions: {
    alignItems: 'center',
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: '#818cf8',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  listContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },

  /* Row: photo + info + status + action.
     Use flex with shrink so text won't overflow. */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
  },

  /* photoCell: fixed square but scales reasonably
     Use percentages for small devices where needed */
  photoCell: {
    width: 64,
    height: 64,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  vehicleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },

  carIcon: {
    width: 56,
    height: 56,
    backgroundColor: '#e3f2ff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { fontSize: 22 },

  /* infoCell prend l'espace restant et peut shrink */
  infoCell: {
    flex: 1,
    minWidth: 0, // important pour Android/React Native text truncation
  },
  immatriculation: {
    fontWeight: '700',
    fontSize: 16,
    color: '#111827',
    flexShrink: 1,
  },
  meta: {
    color: '#6b7280',
    marginTop: 4,
    fontSize: 13,
    flexShrink: 1,
  },

  /* statusCell flexible mais pas trop large */
  statusCell: {
    minWidth: 90,
    maxWidth: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  badgeActive: {
    backgroundColor: '#d4edda',
  },
  badgeInactive: {
    backgroundColor: '#f8d7da',
  },
  badgeText: {
    color: '#155724',
    fontWeight: '700',
    fontSize: 12,
  },

  actionsCell: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '700',
  },

  separator: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyIcon: { fontSize: 36, color: '#ccc' },
  emptyText: { color: '#999', marginTop: 8 },
});


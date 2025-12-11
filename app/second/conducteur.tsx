import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isMediumScreen = width >= 375 && width < 768;
const isLargeScreen = width >= 768;

const DriversManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDriver, setEditedDriver] = useState(null);
  
  const [drivers, setDrivers] = useState([
    {
      id: 'CH001',
      photo: null,
      nom: 'Mbarga',
      prenom: 'Jean',
      telephone: '+237 690 123 456',
      email: 'jean.mbarga@fleetman.cm',
      adresse: 'Yaoundé, Bastos',
      dateEmbauche: '2022-05-15',
      permis: 'Permis B',
      vehiculeAssigne: 'EE437HB',
      statut: 'Actif'
    },
    {
      id: 'CH002',
      photo: null,
      nom: 'Ngono',
      prenom: 'Marie',
      telephone: '+237 677 234 567',
      email: 'marie.ngono@fleetman.cm',
      adresse: 'Douala, Bonanjo',
      dateEmbauche: '2021-03-20',
      permis: 'Permis B, C',
      vehiculeAssigne: 'EE437HB',
      statut: 'En Service'
    },
    {
      id: 'CH003',
      photo: null,
      nom: 'Fopa',
      prenom: 'Paul',
      telephone: '+237 655 345 678',
      email: 'paul.fopa@fleetman.cm',
      adresse: 'Yaoundé, Melen',
      dateEmbauche: '2023-01-10',
      permis: 'Permis B',
      vehiculeAssigne: 'EE437HB',
      statut: 'Hors Service'
    }
  ]);

  const [newDriver, setNewDriver] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    dateEmbauche: '',
    permis: '',
    vehiculeAssigne: '',
    statut: 'Actif'
  });

  const filteredDrivers = drivers.filter(driver =>
    driver.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.telephone.includes(searchTerm)
  );

  const handleAddDriver = useCallback(() => {
    if (newDriver.nom && newDriver.prenom && newDriver.telephone) {
      const driver = {
        ...newDriver,
        id: `CH${String(drivers.length + 1).padStart(3, '0')}`,
        photo: null
      };
      setDrivers([...drivers, driver]);
      setNewDriver({
        nom: '',
        prenom: '',
        telephone: '',
        email: '',
        adresse: '',
        dateEmbauche: '',
        permis: '',
        vehiculeAssigne: '',
        statut: 'Actif'
      });
      setShowAddModal(false);
    }
  }, [newDriver, drivers]);

  const handleDeleteDriver = useCallback((id) => {
    setDrivers(drivers.filter(d => d.id !== id));
  }, [drivers]);

  const handleDriverClick = useCallback((driver) => {
    setSelectedDriver(driver);
    setEditedDriver({...driver});
    setIsEditing(false);
    setShowDetailModal(true);
  }, []);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSaveEdit = useCallback(() => {
    setDrivers(drivers.map(d => d.id === editedDriver.id ? editedDriver : d));
    setSelectedDriver(editedDriver);
    setIsEditing(false);
    setShowDetailModal(false);
  }, [drivers, editedDriver]);

  const handleCancelEdit = useCallback(() => {
    setEditedDriver({...selectedDriver});
    setIsEditing(false);
  }, [selectedDriver]);

  const getStatusColor = (statut) => {
    switch(statut) {
      case 'En Service':
        return styles.statusGreen;
      case 'Actif':
        return styles.statusBlue;
      case 'Hors Service':
        return styles.statusRed;
      default:
        return styles.statusGray;
    }
  };

  const getStatusText = (statut) => {
    switch(statut) {
      case 'En Service':
        return styles.statusTextWhite;
      case 'Actif':
        return styles.statusTextWhite;
      case 'Hors Service':
        return styles.statusTextWhite;
      default:
        return styles.statusTextWhite;
    }
  };

  const renderDriverItem = useCallback(({ item }) => (
    <TouchableOpacity
      style={styles.driverRow}
      onPress={() => handleDriverClick(item)}
      activeOpacity={0.7}
    >
      <View style={styles.tableCell}>
        <View style={styles.photoContainer}>
          <Ionicons name="person" size={isSmallScreen ? 20 : 24} color="#2563eb" />
        </View>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.driverId}>{item.id}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.driverName}>{item.nom} {item.prenom}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.driverText}>{item.telephone}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.driverText} numberOfLines={1}>{item.email}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.driverText}>{item.permis}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.vehicleText}>{item.vehiculeAssigne}</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <View style={[styles.statusBadge, getStatusColor(item.statut)]}>
          <Text style={[styles.statusText, getStatusText(item.statut)]}>{item.statut}</Text>
        </View>
      </View>
      <View style={styles.tableCell}>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            handleDeleteDriver(item.id);
          }}
          style={styles.deleteButton}
        >
          <MaterialIcons name="delete" size={isSmallScreen ? 18 : 22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ), [handleDeleteDriver, handleDriverClick]);

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={styles.tableCell}>
        <Text style={styles.headerText}>Photo</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.headerText}>Matricule</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.headerText}>Nom Complet</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.headerText}>Téléphone</Text>
      </View>
      <View style={[styles.tableCell, styles.flex2]}>
        <Text style={styles.headerText}>Email</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.headerText}>Permis</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.headerText}>Véhicule</Text>
      </View>
      <View style={[styles.tableCell, styles.flex1]}>
        <Text style={styles.headerText}>Statut</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.headerText}>Actions</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes Chauffeurs</Text>
      </View>

      {/* Search and Add Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchRow}>
          <View style={styles.searchInputContainer}>
            <Ionicons 
              name="search" 
              size={isSmallScreen ? 18 : 22} 
              color="#9ca3af" 
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Rechercher un chauffeur..."
              style={styles.searchInput}
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor="#9ca3af"
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowAddModal(true)}
            style={styles.addButton}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={isSmallScreen ? 18 : 22} color="#ffffff" />
            <Text style={styles.addButtonText}>Nouveau chauffeur</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Drivers List */}
      <View style={styles.driversContainer}>
        {width >= 768 ? (
          // Table view for larger screens
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tableContainer}>
              {renderHeader()}
              <FlatList
                data={filteredDrivers}
                renderItem={renderDriverItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.tableContent}
              />
            </View>
          </ScrollView>
        ) : (
          // Card view for mobile
          <FlatList
            data={filteredDrivers}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.driverCard}
                onPress={() => handleDriverClick(item)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardPhoto}>
                    <Ionicons name="person" size={24} color="#2563eb" />
                  </View>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardId}>{item.id}</Text>
                    <Text style={styles.cardName}>{item.nom} {item.prenom}</Text>
                    <View style={[styles.statusBadge, getStatusColor(item.statut)]}>
                      <Text style={[styles.statusText, getStatusText(item.statut)]}>{item.statut}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleDeleteDriver(item.id);
                    }}
                    style={styles.cardDelete}
                  >
                    <MaterialIcons name="delete" size={22} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cardDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="call" size={18} color="#6b7280" />
                    <Text style={styles.detailText}>{item.telephone}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialIcons name="email" size={18} color="#6b7280" />
                    <Text style={styles.detailText} numberOfLines={1}>{item.email}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <FontAwesome5 name="car" size={18} color="#6b7280" />
                    <Text style={styles.vehicleText}>{item.vehiculeAssigne}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      {/* Add Driver Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter un nouveau chauffeur</Text>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={28} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.formGrid}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.nom}
                    onChangeText={(text) => setNewDriver({...newDriver, nom: text})}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.prenom}
                    onChangeText={(text) => setNewDriver({...newDriver, prenom: text})}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Téléphone *</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.telephone}
                    onChangeText={(text) => setNewDriver({...newDriver, telephone: text})}
                    keyboardType="phone-pad"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.email}
                    onChangeText={(text) => setNewDriver({...newDriver, email: text})}
                    keyboardType="email-address"
                  />
                </View>
                
                <View style={styles.fullWidthGroup}>
                  <Text style={styles.label}>Adresse</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.adresse}
                    onChangeText={(text) => setNewDriver({...newDriver, adresse: text})}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Date d'embauche</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.dateEmbauche}
                    onChangeText={(text) => setNewDriver({...newDriver, dateEmbauche: text})}
                    placeholder="YYYY-MM-DD"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Type de permis</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.permis}
                    onChangeText={(text) => setNewDriver({...newDriver, permis: text})}
                    placeholder="Ex: Permis B, C"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Véhicule assigné</Text>
                  <TextInput
                    style={styles.input}
                    value={newDriver.vehiculeAssigne}
                    onChangeText={(text) => setNewDriver({...newDriver, vehiculeAssigne: text})}
                    placeholder="Ex: EE437HB"
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Statut</Text>
                  <View style={styles.selectContainer}>
                    <TextInput
                      style={styles.input}
                      value={newDriver.statut}
                      onChangeText={(text) => setNewDriver({...newDriver, statut: text})}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                onPress={() => setShowAddModal(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddDriver}
                style={styles.saveButton}
              >
                <Text style={styles.saveButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Driver Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setShowDetailModal(false);
          setIsEditing(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Modifier le chauffeur' : 'Détails du chauffeur'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowDetailModal(false);
                  setIsEditing(false);
                }}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={28} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <View style={styles.detailPhotoContainer}>
                <View style={styles.detailPhoto}>
                  <Ionicons name="person" size={isSmallScreen ? 40 : 48} color="#2563eb" />
                </View>
              </View>

              <View style={styles.detailGrid}>
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Matricule</Text>
                  <View style={styles.detailValueContainer}>
                    <Text style={styles.detailValue}>{editedDriver?.id}</Text>
                  </View>
                </View>
                
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Statut</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.statut}
                      onChangeText={(text) => setEditedDriver({...editedDriver, statut: text})}
                    />
                  ) : (
                    <View style={[styles.statusBadge, getStatusColor(editedDriver?.statut)]}>
                      <Text style={[styles.statusText, getStatusText(editedDriver?.statut)]}>
                        {editedDriver?.statut}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Nom</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.nom}
                      onChangeText={(text) => setEditedDriver({...editedDriver, nom: text})}
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.nom}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Prénom</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.prenom}
                      onChangeText={(text) => setEditedDriver({...editedDriver, prenom: text})}
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.prenom}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.detailGroup}>
                  <View style={styles.iconLabel}>
                    <Feather name="phone" size={18} color="#4b5563" />
                    <Text style={styles.detailLabel}>Téléphone</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.telephone}
                      onChangeText={(text) => setEditedDriver({...editedDriver, telephone: text})}
                      keyboardType="phone-pad"
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.telephone}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.detailGroup}>
                  <View style={styles.iconLabel}>
                    <MaterialIcons name="email" size={18} color="#4b5563" />
                    <Text style={styles.detailLabel}>Email</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.email}
                      onChangeText={(text) => setEditedDriver({...editedDriver, email: text})}
                      keyboardType="email-address"
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.email}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.fullWidthGroup}>
                  <View style={styles.iconLabel}>
                    <Feather name="map-pin" size={18} color="#4b5563" />
                    <Text style={styles.detailLabel}>Adresse</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.adresse}
                      onChangeText={(text) => setEditedDriver({...editedDriver, adresse: text})}
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.adresse}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.detailGroup}>
                  <View style={styles.iconLabel}>
                    <Feather name="calendar" size={18} color="#4b5563" />
                    <Text style={styles.detailLabel}>Date d'embauche</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.dateEmbauche}
                      onChangeText={(text) => setEditedDriver({...editedDriver, dateEmbauche: text})}
                      placeholder="YYYY-MM-DD"
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>
                        {editedDriver?.dateEmbauche ? 
                          new Date(editedDriver.dateEmbauche).toLocaleDateString('fr-FR') : 
                          'Non spécifiée'}
                      </Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.detailGroup}>
                  <Text style={styles.detailLabel}>Type de permis</Text>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.permis}
                      onChangeText={(text) => setEditedDriver({...editedDriver, permis: text})}
                    />
                  ) : (
                    <View style={styles.detailValueContainer}>
                      <Text style={styles.detailValue}>{editedDriver?.permis}</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.fullWidthGroup}>
                  <View style={styles.iconLabel}>
                    <FontAwesome5 name="car" size={18} color="#4b5563" />
                    <Text style={styles.detailLabel}>Véhicule assigné</Text>
                  </View>
                  {isEditing ? (
                    <TextInput
                      style={styles.input}
                      value={editedDriver?.vehiculeAssigne}
                      onChangeText={(text) => setEditedDriver({...editedDriver, vehiculeAssigne: text})}
                    />
                  ) : (
                    <View style={[styles.detailValueContainer, styles.vehicleContainer]}>
                      <Text style={styles.vehicleDetailText}>{editedDriver?.vehiculeAssigne}</Text>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              {isEditing ? (
                <>
                  <TouchableOpacity
                    onPress={handleCancelEdit}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveEdit}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Enregistrer</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDetailModal(false);
                      setIsEditing(false);
                    }}
                    style={styles.cancelButton}
                  >
                    <Text style={styles.cancelButtonText}>Fermer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleEditClick}
                    style={styles.editButton}
                  >
                    <Text style={styles.editButtonText}>Modifier</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default DriversManagementPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: isSmallScreen ? 12 : isMediumScreen ? 16 : 24,
    paddingVertical: isSmallScreen ? 12 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: isSmallScreen ? 20 : isMediumScreen ? 22 : 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    margin: isSmallScreen ? 12 : isMediumScreen ? 16 : 24,
    padding: isSmallScreen ? 12 : isMediumScreen ? 16 : 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginRight: isSmallScreen ? 8 : 12,
  },
  searchIcon: {
    marginLeft: isSmallScreen ? 12 : 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: isSmallScreen ? 8 : 12,
    paddingVertical: isSmallScreen ? 10 : 12,
    fontSize: isSmallScreen ? 14 : 16,
    color: '#1f2937',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b35',
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 10 : 12,
    borderRadius: 8,
    minWidth: isSmallScreen ? 140 : 160,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  driversContainer: {
    flex: 1,
    marginHorizontal: isSmallScreen ? 12 : isMediumScreen ? 16 : 24,
    marginBottom: isSmallScreen ? 12 : 16,
  },
  tableContainer: {
    minWidth: width < 768 ? width * 1.5 : width,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 12,
    minWidth: width < 768 ? width * 1.5 : width,
  },
  tableCell: {
    paddingHorizontal: isSmallScreen ? 6 : isMediumScreen ? 8 : 12,
    justifyContent: 'center',
    minWidth: isSmallScreen ? 60 : isMediumScreen ? 70 : 80,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },
  headerText: {
    fontSize: isSmallScreen ? 12 : isMediumScreen ? 13 : 14,
    fontWeight: '600',
    color: '#374151',
  },
  driverRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingVertical: 12,
    minWidth: width < 768 ? width * 1.5 : width,
  },
  photoContainer: {
    width: isSmallScreen ? 36 : 40,
    height: isSmallScreen ? 36 : 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverId: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  driverName: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  driverText: {
    fontSize: isSmallScreen ? 11 : 13,
    color: '#4b5563',
  },
  vehicleText: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: '#2563eb',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: isSmallScreen ? 6 : 8,
    paddingVertical: isSmallScreen ? 2 : 4,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: isSmallScreen ? 70 : 80,
  },
  statusGreen: {
    backgroundColor: '#10b981',
  },
  statusBlue: {
    backgroundColor: '#3b82f6',
  },
  statusRed: {
    backgroundColor: '#ef4444',
  },
  statusGray: {
    backgroundColor: '#6b7280',
  },
  statusText: {
    fontSize: isSmallScreen ? 10 : 12,
    fontWeight: '500',
  },
  statusTextWhite: {
    color: '#ffffff',
  },
  deleteButton: {
    padding: 4,
  },
  tableContent: {
    paddingBottom: 20,
  },
  driverCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: isSmallScreen ? 12 : 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 6,
  },
  cardDelete: {
    padding: 4,
  },
  cardDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    marginLeft: 8,
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: isSmallScreen ? 12 : isMediumScreen ? 16 : 24,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 600,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingVertical: isSmallScreen ? 16 : 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: isSmallScreen ? 18 : isMediumScreen ? 20 : 24,
    fontWeight: '700',
    color: '#1f2937',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    maxHeight: height * 0.6,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingVertical: isSmallScreen ? 16 : 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  formGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: isSmallScreen ? 16 : 24,
    gap: isSmallScreen ? 12 : 16,
  },
  formGroup: {
    width: width < 768 ? '100%' : '48%',
  },
  fullWidthGroup: {
    width: '100%',
  },
  label: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 10 : 12,
    fontSize: isSmallScreen ? 14 : 16,
    color: '#1f2937',
    backgroundColor: '#ffffff',
  },
  selectContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  cancelButton: {
    paddingHorizontal: isSmallScreen ? 20 : 24,
    paddingVertical: isSmallScreen ? 10 : 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#374151',
  },
  saveButton: {
    paddingHorizontal: isSmallScreen ? 20 : 24,
    paddingVertical: isSmallScreen ? 10 : 12,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  editButton: {
    paddingHorizontal: isSmallScreen ? 20 : 24,
    paddingVertical: isSmallScreen ? 10 : 12,
    backgroundColor: '#ff6b35',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  detailPhotoContainer: {
    alignItems: 'center',
    paddingVertical: isSmallScreen ? 16 : 24,
  },
  detailPhoto: {
    width: isSmallScreen ? 80 : 96,
    height: isSmallScreen ? 80 : 96,
    borderRadius: 48,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: isSmallScreen ? 16 : 24,
    paddingBottom: isSmallScreen ? 16 : 24,
    gap: isSmallScreen ? 12 : 16,
  },
  detailGroup: {
    width: width < 768 ? '100%' : '48%',
  },
  detailLabel: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    marginLeft: 4,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailValueContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: isSmallScreen ? 12 : 16,
    paddingVertical: isSmallScreen ? 10 : 12,
  },
  detailValue: {
    fontSize: isSmallScreen ? 14 : 16,
    color: '#1f2937',
  },
  vehicleContainer: {
    backgroundColor: '#eff6ff',
  },
  vehicleDetailText: {
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
    color: '#2563eb',
  },
});